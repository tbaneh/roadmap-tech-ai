// Progress Sync Service - Firestore Integration
import { db } from '../config/firebase-config.js';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { authService } from './auth-service.js';

class ProgressSyncService {
  constructor() {
    this.currentUser = null;
    this.isOnline = navigator.onLine;
    this.syncQueue = [];
    this.lastSyncTime = null;
    this.unsubscribeSnapshot = null;
    
    this.init();
  }

  // Initialize the service
  init() {
    // Listen for auth state changes
    window.addEventListener('authStateChanged', (e) => {
      this.handleAuthChange(e.detail.state, e.detail.user);
    });

    // Listen for online/offline changes
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processSyncQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Listen for localStorage changes (from other tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === 'userProgress' && this.currentUser) {
        this.queueProgressSync();
      }
    });
  }

  // Handle authentication state changes
  async handleAuthChange(state, user) {
    if (state === 'signed-in') {
      this.currentUser = user;
      await this.initializeUserProgress();
      this.setupRealtimeSync();
    } else {
      this.currentUser = null;
      this.cleanupRealtimeSync();
    }
  }

  // Initialize user progress (merge local with cloud)
  async initializeUserProgress() {
    if (!this.currentUser || !this.isOnline) return;

    try {
      console.log('🔄 Initializing user progress sync...');
      
      // Get local progress
      const localProgress = this.getLocalProgress();
      
      // Get cloud progress
      const cloudProgress = await this.getCloudProgress();
      
      // Merge and sync
      const mergedProgress = this.mergeProgress(localProgress, cloudProgress);
      
      // Update both local and cloud
      this.saveLocalProgress(mergedProgress);
      await this.saveCloudProgress(mergedProgress);
      
      console.log('✅ User progress initialized and synced');
      
      // Update the global progress system
      this.updateGlobalProgressSystem(mergedProgress);
      
    } catch (error) {
      console.error('❌ Error initializing user progress:', error);
      // Fall back to local progress only
      this.fallbackToLocalProgress();
    }
  }

  // Get local progress from localStorage
  getLocalProgress() {
    try {
      const saved = localStorage.getItem('userProgress');
      return saved ? JSON.parse(saved) : this.getDefaultProgress();
    } catch (error) {
      console.error('Error reading local progress:', error);
      return this.getDefaultProgress();
    }
  }

  // Get cloud progress from Firestore
  async getCloudProgress() {
    if (!this.currentUser) return null;

    try {
      const userRef = doc(db, 'users', this.currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.progress || this.getDefaultProgress();
      }
      
      return null;
    } catch (error) {
      console.error('Error reading cloud progress:', error);
      return null;
    }
  }

  // Merge local and cloud progress (cloud takes precedence for conflicts)
  mergeProgress(localProgress, cloudProgress) {
    if (!cloudProgress) return localProgress;
    if (!localProgress) return cloudProgress;

    // Compare timestamps to determine which is more recent
    const localTime = new Date(localProgress.lastUpdated || 0).getTime();
    const cloudTime = new Date(cloudProgress.lastUpdated || 0).getTime();

    // If cloud is more recent, use it as base
    if (cloudTime > localTime) {
      return {
        ...cloudProgress,
        lastUpdated: new Date().toISOString(),
        lastSyncTime: new Date().toISOString()
      };
    }

    // Otherwise, merge local into cloud structure
    return {
      roadmaps: { ...cloudProgress.roadmaps, ...localProgress.roadmaps },
      completedTopics: [
        ...new Set([
          ...(cloudProgress.completedTopics || []),
          ...(localProgress.completedTopics || [])
        ])
      ],
      studyHours: Math.max(cloudProgress.studyHours || 0, localProgress.studyHours || 0),
      badgesEarned: [
        ...new Set([
          ...(cloudProgress.badgesEarned || []),
          ...(localProgress.badgesEarned || [])
        ])
      ],
      tasksCompleted: Math.max(cloudProgress.tasksCompleted || 0, localProgress.tasksCompleted || 0),
      questionsAnswered: Math.max(cloudProgress.questionsAnswered || 0, localProgress.questionsAnswered || 0),
      xp: Math.max(cloudProgress.xp || 0, localProgress.xp || 0),
      level: Math.max(cloudProgress.level || 1, localProgress.level || 1),
      streak: Math.max(cloudProgress.streak || 0, localProgress.streak || 0),
      longestStreak: Math.max(cloudProgress.longestStreak || 0, localProgress.longestStreak || 0),
      lastStudyDate: this.getMostRecentDate(cloudProgress.lastStudyDate, localProgress.lastStudyDate),
      lastUpdated: new Date().toISOString(),
      lastSyncTime: new Date().toISOString()
    };
  }

  // Get most recent date
  getMostRecentDate(date1, date2) {
    if (!date1) return date2;
    if (!date2) return date1;
    
    return new Date(date1) > new Date(date2) ? date1 : date2;
  }

  // Get default progress structure
  getDefaultProgress() {
    return {
      roadmaps: {},
      completedTopics: [],
      studyHours: 0,
      badgesEarned: [],
      lastStudyDate: null,
      tasksCompleted: 0,
      questionsAnswered: 0,
      xp: 0,
      level: 1,
      streak: 0,
      longestStreak: 0,
      lastUpdated: new Date().toISOString()
    };
  }

  // Save progress to localStorage
  saveLocalProgress(progress) {
    try {
      localStorage.setItem('userProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving local progress:', error);
    }
  }

  // Save progress to Firestore
  async saveCloudProgress(progress) {
    if (!this.currentUser || !this.isOnline) {
      this.queueProgressSync(progress);
      return;
    }

    try {
      const userRef = doc(db, 'users', this.currentUser.uid);
      await updateDoc(userRef, {
        'progress': progress,
        'lastSyncTime': new Date().toISOString()
      });
      
      this.lastSyncTime = new Date().toISOString();
      console.log('✅ Progress saved to cloud');
      
    } catch (error) {
      console.error('❌ Error saving cloud progress:', error);
      this.queueProgressSync(progress);
    }
  }

  // Queue progress for sync when online
  queueProgressSync(progress = null) {
    const progressToSync = progress || this.getLocalProgress();
    
    this.syncQueue.push({
      type: 'progress',
      data: progressToSync,
      timestamp: new Date().toISOString()
    });

    // Try to process queue if online
    if (this.isOnline) {
      this.processSyncQueue();
    }
  }

  // Process sync queue
  async processSyncQueue() {
    if (!this.currentUser || !this.isOnline || this.syncQueue.length === 0) return;

    console.log(`🔄 Processing ${this.syncQueue.length} items in sync queue...`);

    while (this.syncQueue.length > 0) {
      const item = this.syncQueue.shift();
      
      try {
        if (item.type === 'progress') {
          await this.saveCloudProgress(item.data);
        }
      } catch (error) {
        console.error('Error processing sync queue item:', error);
        // Re-queue the item
        this.syncQueue.unshift(item);
        break;
      }
    }
  }

  // Setup real-time sync with Firestore
  setupRealtimeSync() {
    if (!this.currentUser) return;

    const userRef = doc(db, 'users', this.currentUser.uid);
    
    this.unsubscribeSnapshot = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        const cloudProgress = userData.progress;
        
        if (cloudProgress && cloudProgress.lastSyncTime !== this.lastSyncTime) {
          console.log('🔄 Cloud progress updated, syncing locally...');
          
          // Update local progress
          this.saveLocalProgress(cloudProgress);
          
          // Update global progress system
          this.updateGlobalProgressSystem(cloudProgress);
          
          this.lastSyncTime = cloudProgress.lastSyncTime;
        }
      }
    }, (error) => {
      console.error('Error in real-time sync:', error);
    });
  }

  // Cleanup real-time sync
  cleanupRealtimeSync() {
    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
      this.unsubscribeSnapshot = null;
    }
  }

  // Update global progress system
  updateGlobalProgressSystem(progress) {
    if (window.userProgressSystem) {
      // Update the existing progress system with new data
      window.userProgressSystem.progress = progress;
      window.userProgressSystem.saveProgress();
      
      // Trigger progress update events
      const event = new CustomEvent('progressUpdated', { detail: progress });
      window.dispatchEvent(event);
      
      console.log('✅ Global progress system updated');
    }
  }

  // Fallback to local progress only
  fallbackToLocalProgress() {
    console.log('⚠️ Falling back to local progress only');
    
    const localProgress = this.getLocalProgress();
    this.updateGlobalProgressSystem(localProgress);
    
    // Show notification to user
    if (window.authStateManager) {
      window.authStateManager.showNotification(
        'Modo offline: seu progresso será sincronizado quando voltar online.',
        'warning'
      );
    }
  }

  // Public methods for manual sync
  async forceSync() {
    if (!this.currentUser) {
      console.log('❌ Cannot sync: user not authenticated');
      return false;
    }

    if (!this.isOnline) {
      console.log('❌ Cannot sync: offline');
      return false;
    }

    try {
      await this.initializeUserProgress();
      await this.processSyncQueue();
      return true;
    } catch (error) {
      console.error('❌ Force sync failed:', error);
      return false;
    }
  }

  // Check sync status
  getSyncStatus() {
    return {
      isAuthenticated: !!this.currentUser,
      isOnline: this.isOnline,
      lastSyncTime: this.lastSyncTime,
      queueLength: this.syncQueue.length,
      hasCloudBackup: !!this.lastSyncTime
    };
  }

  // Export progress for backup
  exportProgress() {
    const progress = this.getLocalProgress();
    const exportData = {
      progress,
      exportDate: new Date().toISOString(),
      version: '2.0.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `roadmap-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    
    console.log('✅ Progress exported successfully');
  }

  // Import progress from backup
  async importProgress(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const importData = JSON.parse(e.target.result);
          const progress = importData.progress;
          
          if (!progress) {
            throw new Error('Invalid backup file format');
          }
          
          // Save locally
          this.saveLocalProgress(progress);
          
          // Save to cloud if authenticated
          if (this.currentUser && this.isOnline) {
            await this.saveCloudProgress(progress);
          }
          
          // Update global system
          this.updateGlobalProgressSystem(progress);
          
          console.log('✅ Progress imported successfully');
          resolve(true);
          
        } catch (error) {
          console.error('❌ Error importing progress:', error);
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  }
}

// Export singleton instance
export const progressSyncService = new ProgressSyncService();

// Make it globally available
window.progressSyncService = progressSyncService;

export default progressSyncService;
