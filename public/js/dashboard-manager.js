/**
 * DashboardManager - Sistema Completo de Progresso
 * Gerencia tracking de tópicos, XP, níveis, conquistas e persistência Firebase
 */

// Global XP Constants - Available everywhere
const LEVEL_BASE_XP = 100;      // Base XP required for level 2
const LEVEL_MULTIPLIER = 1.5;   // XP multiplier per level
const XP_PER_TOPIC = 25;        // XP gained per completed topic
const XP_PER_HOUR = 10;         // XP gained per hour of study
const XP_BONUS_STREAK = 10;     // Bonus XP for streaks
const XP_BONUS_SECTION = 50;    // Bonus XP for completing a section
const XP_BONUS_ROADMAP = 500;   // Bonus XP for completing a roadmap

// Expose constants to window for global access
window.LEVEL_BASE_XP = LEVEL_BASE_XP;
window.LEVEL_MULTIPLIER = LEVEL_MULTIPLIER;
window.XP_PER_TOPIC = XP_PER_TOPIC;
window.XP_PER_HOUR = XP_PER_HOUR;
window.XP_BONUS_STREAK = XP_BONUS_STREAK;
window.XP_BONUS_SECTION = XP_BONUS_SECTION;
window.XP_BONUS_ROADMAP = XP_BONUS_ROADMAP;

class DashboardManager {
  constructor() {
    this.currentUser = null;
    this.db = null;
    
    // XP Configuration - Using global constants
    this.config = {
      LEVEL_BASE_XP: LEVEL_BASE_XP,
      LEVEL_MULTIPLIER: LEVEL_MULTIPLIER,
      XP_PER_TOPIC: XP_PER_TOPIC,
      XP_PER_HOUR: XP_PER_HOUR,
      XP_BONUS_STREAK: XP_BONUS_STREAK,
      XP_BONUS_SECTION: XP_BONUS_SECTION,
      XP_BONUS_ROADMAP: XP_BONUS_ROADMAP
    };
    
    this.userProgress = {
      totalXP: 0,
      level: 1,
      completedTopics: 0,
      studyHours: 0,
      badges: [],
      roadmaps: {},
      streaks: {
        current: 0,
        longest: 0,
        lastActivity: null
      },
      achievements: [],
      statistics: {
        totalSessions: 0,
        averageSessionTime: 0,
        favoriteRoadmap: null
      }
    };
    
    // Process pending events from localStorage immediately
    this.processPendingEvents();
    
    // Load saved progress from localStorage
    this.loadProgressFromLocalStorage();

    this.badges = [
      { id: 'first_steps', name: 'Primeiros Passos', icon: '🚀', description: 'Complete seu primeiro tópico', xpRequired: 10 },
      { id: 'quick_learner', name: 'Aprendiz Rápido', icon: '⚡', description: 'Complete 5 tópicos em um dia', xpRequired: 50 },
      { id: 'dedicated', name: 'Dedicado', icon: '🎯', description: 'Mantenha uma sequência de 7 dias', xpRequired: 100 },
      { id: 'data_master', name: 'Mestre dos Dados', icon: '📊', description: 'Complete o roadmap Data Scientist', xpRequired: 200 },
      { id: 'bi_expert', name: 'Especialista BI', icon: '📈', description: 'Complete o roadmap BI Analyst', xpRequired: 150 },
      { id: 'code_ninja', name: 'Ninja do Código', icon: '💻', description: 'Complete o roadmap Software Engineer', xpRequired: 250 },
      { id: 'analyst_pro', name: 'Analista Pro', icon: '🔍', description: 'Complete o roadmap Data Analyst', xpRequired: 180 },
      { id: 'marathon_runner', name: 'Maratonista', icon: '🏃', description: 'Estude por 100 horas', xpRequired: 500 },
      { id: 'overachiever', name: 'Superdotado', icon: '🌟', description: 'Alcance o nível 10', xpRequired: 1000 }
    ];

    this.init();
  }

  async init() {
    try {
      // Initialize Firebase if not already done
      if (!window.firebase || !firebase.apps.length) {
        console.log('⚠️ Firebase não inicializado, aguardando...');
        setTimeout(() => this.init(), 1000);
        return;
      }

      this.db = firebase.firestore();
      
      // Listen for auth state changes
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.currentUser = user;
          this.loadUserProgress();
        } else {
          this.currentUser = null;
          this.showLoginPrompt();
        }
      });

      // Initialize UI listeners
      this.setupEventListeners();
      
      console.log('✅ DashboardManager inicializado com sucesso');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar DashboardManager:', error);
      this.showErrorState('Erro ao carregar sistema de progresso');
    }
  }

  async loadUserProgress() {
    if (!this.currentUser || !this.db) return;

    try {
      // Show loading state
      this.showLoadingState();

      const progressDoc = await this.db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('progress')
        .doc('main')
        .get();

      if (progressDoc.exists) {
        this.userProgress = { ...this.userProgress, ...progressDoc.data() };
      } else {
        // Create initial progress document
        await this.saveUserProgress();
      }

      // Load roadmap progress
      await this.loadRoadmapProgress();
      
      // Update UI
      this.updateDashboardUI();
      this.hideLoadingState();
      
      console.log('✅ Progresso do usuário carregado:', this.userProgress);
      
    } catch (error) {
      console.error('❌ Erro ao carregar progresso:', error);
      this.showErrorState('Erro ao carregar progresso do usuário');
    }
  }

  async loadRoadmapProgress() {
    if (!this.currentUser || !this.db) return;

    try {
      const roadmapsSnapshot = await this.db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('roadmaps')
        .get();

      roadmapsSnapshot.forEach((doc) => {
        this.userProgress.roadmaps[doc.id] = doc.data();
      });

    } catch (error) {
      console.error('❌ Erro ao carregar progresso dos roadmaps:', error);
    }
  }

  async saveUserProgress() {
    if (!this.currentUser || !this.db) return;

    try {
      await this.db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('progress')
        .doc('main')
        .set({
          ...this.userProgress,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

      console.log('✅ Progresso salvo no Firebase');
      
    } catch (error) {
      console.error('❌ Erro ao salvar progresso:', error);
    }
  }

  async saveRoadmapProgress(roadmapId, progressData) {
    if (!this.currentUser || !this.db) return;

    try {
      await this.db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('roadmaps')
        .doc(roadmapId)
        .set({
          ...progressData,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

      console.log(`✅ Progresso do roadmap ${roadmapId} salvo`);
      
    } catch (error) {
      console.error(`❌ Erro ao salvar progresso do roadmap ${roadmapId}:`, error);
    }
  }

  // Main function to mark topic as completed
  async markTopicCompleted(roadmapId, topicId, topicTitle, estimatedHours = 0.5) {
    // GUEST MODE: Allow XP to work without Firebase login
    const isGuestMode = !this.currentUser;
    
    if (isGuestMode) {
      console.log('🎯 Guest Mode: Processing XP without Firebase login');
    }

    try {
      // Initialize roadmap progress if not exists
      if (!this.userProgress.roadmaps[roadmapId]) {
        this.userProgress.roadmaps[roadmapId] = {
          completedTopics: [],
          totalTopics: 0,
          completionPercentage: 0,
          lastActivity: null
        };
      }

      const roadmapProgress = this.userProgress.roadmaps[roadmapId];

      // Check if already completed
      if (roadmapProgress.completedTopics.includes(topicId)) {
        console.log('⚠️ Tópico já foi concluído anteriormente');
        return false;
      }

      // Add to completed topics
      roadmapProgress.completedTopics.push(topicId);
      roadmapProgress.lastActivity = new Date().toISOString();

      // Update global stats
      this.userProgress.completedTopics++;
      this.userProgress.studyHours += estimatedHours;
      
      // Add XP - Simplified calculation
      const xpGained = 25; // Fixed 25 XP per topic for now
      this.userProgress.totalXP += xpGained;
      console.log(`💰 XP Gained: ${xpGained}, Total XP: ${this.userProgress.totalXP}`);
      
      // Update level
      this.updateLevel();
      
      // Update streaks
      this.updateStreaks();
      
      // Check for new achievements
      await this.checkAchievements(roadmapId, topicId, topicTitle);
      
      // Save to Firebase (only if user is logged in)
      if (!isGuestMode) {
        await this.saveUserProgress();
        await this.saveRoadmapProgress(roadmapId, roadmapProgress);
        console.log('💾 Firebase: Progress saved to cloud');
      } else {
        // Guest mode: Save to localStorage as backup
        localStorage.setItem('guestProgress', JSON.stringify(this.userProgress));
        console.log('💾 Guest Mode: Progress saved to localStorage');
      }
      
      // Update UI
      this.updateDashboardUI();
      
      // Show success feedback
      this.showXPGain(xpGained, topicTitle);
      
      console.log(`✅ Tópico ${topicId} marcado como concluído. XP ganho: ${xpGained}`);
      
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao marcar tópico como concluído:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack,
        isGuestMode: isGuestMode,
        hasFirebase: typeof firebase !== 'undefined',
        hasAuth: window.auth ? true : false,
        currentUser: this.currentUser ? 'exists' : 'null'
      });
      
      // Only show alert for non-guest mode errors or critical errors
      if (!isGuestMode && error.code !== 'permission-denied') {
        alert('❌ Erro ao salvar progresso. Tente novamente.');
      } else if (isGuestMode) {
        console.log('⚠️ Guest mode: Saving locally only (Firebase error ignored)');
        // Don't show error in guest mode, just save locally
        localStorage.setItem('dashboardData', JSON.stringify(this.data));
        localStorage.setItem('guestProgress', JSON.stringify(this.userProgress));
        this.updateDashboardUI();
        this.showXPGain(25, topicTitle || 'Tópico');
        return true; // Return success for guest mode
      }
      
      return false;
    }
  }

  updateLevel() {
    const newLevel = this.calculateLevel(this.userProgress.totalXP);
    
    if (newLevel > this.userProgress.level) {
      const oldLevel = this.userProgress.level;
      this.userProgress.level = newLevel;
      
      // Show level up notification
      this.showLevelUp(oldLevel, newLevel);
    }
  }

  calculateLevel(totalXP) {
    let level = 1;
    let xpRequired = this.config.LEVEL_BASE_XP;
    let currentXP = totalXP;

    while (currentXP >= xpRequired) {
      currentXP -= xpRequired;
      level++;
      xpRequired = Math.floor(xpRequired * this.config.LEVEL_MULTIPLIER);
    }

    return level;
  }

  getXPForLevel(level) {
    let totalXP = 0;
    let xpRequired = this.config.LEVEL_BASE_XP;

    for (let i = 1; i < level; i++) {
      totalXP += xpRequired;
      xpRequired = Math.floor(xpRequired * this.config.LEVEL_MULTIPLIER);
    }

    return totalXP;
  }

  getXPToNextLevel() {
    const currentLevelXP = this.getXPForLevel(this.userProgress.level);
    const nextLevelXP = this.getXPForLevel(this.userProgress.level + 1);
    const xpInCurrentLevel = this.userProgress.totalXP - currentLevelXP;
    const xpRequiredForLevel = nextLevelXP - currentLevelXP;
    
    return {
      current: xpInCurrentLevel,
      required: xpRequiredForLevel,
      remaining: xpRequiredForLevel - xpInCurrentLevel
    };
  }

  updateStreaks() {
    const today = new Date();
    const lastActivity = this.userProgress.streaks.lastActivity 
      ? new Date(this.userProgress.streaks.lastActivity) 
      : null;

    if (!lastActivity) {
      // First activity ever
      this.userProgress.streaks.current = 1;
      this.userProgress.streaks.longest = 1;
    } else {
      const daysDiff = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 0) {
        // Same day, maintain streak
        return;
      } else if (daysDiff === 1) {
        // Next day, continue streak
        this.userProgress.streaks.current++;
        this.userProgress.streaks.longest = Math.max(
          this.userProgress.streaks.longest, 
          this.userProgress.streaks.current
        );
        
        // Add streak bonus XP
        this.userProgress.totalXP += this.config.XP_PER_STREAK_DAY;
      } else {
        // Streak broken
        this.userProgress.streaks.current = 1;
      }
    }

    this.userProgress.streaks.lastActivity = today.toISOString();
  }

  async checkAchievements(roadmapId, topicId, topicTitle) {
    const newBadges = [];

    this.badges.forEach(badge => {
      // Skip if already earned
      if (this.userProgress.badges.includes(badge.id)) return;

      let earned = false;

      switch (badge.id) {
        case 'first_steps':
          earned = this.userProgress.completedTopics >= 1;
          break;
        case 'quick_learner':
          earned = this.userProgress.completedTopics >= 5;
          break;
        case 'dedicated':
          earned = this.userProgress.streaks.current >= 7;
          break;
        case 'data_master':
          earned = this.isRoadmapCompleted('data-scientist');
          break;
        case 'bi_expert':
          earned = this.isRoadmapCompleted('bi-analyst');
          break;
        case 'code_ninja':
          earned = this.isRoadmapCompleted('software-engineer-google');
          break;
        case 'analyst_pro':
          earned = this.isRoadmapCompleted('data-analyst');
          break;
        case 'marathon_runner':
          earned = this.userProgress.studyHours >= 100;
          break;
        case 'overachiever':
          earned = this.userProgress.level >= 10;
          break;
      }

      if (earned) {
        this.userProgress.badges.push(badge.id);
        newBadges.push(badge);
      }
    });

    // Show new badge notifications
    newBadges.forEach(badge => {
      setTimeout(() => this.showBadgeEarned(badge), 1000);
    });
  }

  isRoadmapCompleted(roadmapId) {
    const progress = this.userProgress.roadmaps[roadmapId];
    if (!progress) return false;
    
    // Consider completed if 80% or more topics are done
    return progress.completionPercentage >= 80;
  }

  updateDashboardUI() {
    try {
      // Update main stats
      this.updateElement('totalProgress', `${this.calculateOverallProgress()}%`);
      this.updateElement('completedTopics', this.userProgress.completedTopics);
      this.updateElement('studyHours', `${Math.floor(this.userProgress.studyHours)}h`);
      this.updateElement('badgesEarned', this.userProgress.badges.length);

      // Update XP system
      this.updateXPSystem();

      // Update roadmap progress
      this.updateRoadmapProgress();

      // Update badges
      this.updateBadges();

      // Update streaks
      this.updateStreaks();
      
    } catch (error) {
      console.error('❌ Erro ao atualizar UI do dashboard:', error);
    }
  }

  calculateOverallProgress() {
    const roadmapIds = Object.keys(this.userProgress.roadmaps);
    if (roadmapIds.length === 0) return 0;

    const totalProgress = roadmapIds.reduce((sum, id) => {
      return sum + (this.userProgress.roadmaps[id].completionPercentage || 0);
    }, 0);

    return Math.floor(totalProgress / roadmapIds.length);
  }

  updateXPSystem() {
    const xpInfo = this.getXPToNextLevel();
    
    this.updateElement('userLevel', this.userProgress.level);
    this.updateElement('currentXP', xpInfo.current);
    this.updateElement('nextLevelXP', xpInfo.required);
    
    // Update XP bar
    const xpFill = document.getElementById('xpFill');
    if (xpFill) {
      const percentage = (xpInfo.current / xpInfo.required) * 100;
      xpFill.style.width = `${percentage}%`;
    }
  }

  updateRoadmapProgress() {
    const container = document.getElementById('roadmapProgress');
    if (!container) return;

    const roadmaps = [
      { id: 'data-scientist', name: '📊 Data Scientist', icon: '📊' },
      { id: 'bi-analyst', name: '📋 BI Analyst', icon: '📋' },
      { id: 'software-engineer-google', name: '💻 Software Engineer', icon: '💻' },
      { id: 'data-analyst', name: '📈 Data Analyst', icon: '📈' }
    ];

    container.innerHTML = '';

    roadmaps.forEach(roadmap => {
      const progress = this.userProgress.roadmaps[roadmap.id] || { completionPercentage: 0 };
      
      const progressItem = document.createElement('div');
      progressItem.className = 'progress-item';
      progressItem.innerHTML = `
        <div class="progress-header">
          <span class="progress-label">${roadmap.name}</span>
          <span class="progress-percentage">${progress.completionPercentage || 0}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress.completionPercentage || 0}%"></div>
        </div>
      `;
      
      container.appendChild(progressItem);
    });
  }

  updateBadges() {
    const container = document.getElementById('badgesContainer');
    if (!container) return;

    container.innerHTML = '';

    this.badges.forEach(badge => {
      const earned = this.userProgress.badges.includes(badge.id);
      
      const badgeElement = document.createElement('div');
      badgeElement.className = `badge-item ${earned ? 'earned' : 'locked'}`;
      badgeElement.innerHTML = `
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-info">
          <div class="badge-name">${badge.name}</div>
          <div class="badge-description">${badge.description}</div>
        </div>
      `;
      
      if (earned) {
        badgeElement.setAttribute('title', `Conquistado! ${badge.description}`);
      } else {
        badgeElement.setAttribute('title', `${badge.description} (${badge.xpRequired} XP necessário)`);
      }
      
      container.appendChild(badgeElement);
    });
  }

  updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  showXPGain(xpGained, topicTitle) {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.innerHTML = `
      <div class="xp-notification-content">
        <div class="xp-icon">⚡</div>
        <div class="xp-text">
          <div class="xp-amount">+${xpGained} XP</div>
          <div class="xp-reason">${topicTitle}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  }

  showLevelUp(oldLevel, newLevel) {
    const modal = document.createElement('div');
    modal.className = 'level-up-modal';
    modal.innerHTML = `
      <div class="level-up-content">
        <div class="level-up-icon">🎉</div>
        <h2>Parabéns!</h2>
        <p>Você subiu para o <strong>Nível ${newLevel}</strong>!</p>
        <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">
          Continuar
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
  }

  showBadgeEarned(badge) {
    const modal = document.createElement('div');
    modal.className = 'badge-earned-modal';
    modal.innerHTML = `
      <div class="badge-earned-content">
        <div class="badge-earned-icon">${badge.icon}</div>
        <h2>Nova Conquista!</h2>
        <h3>${badge.name}</h3>
        <p>${badge.description}</p>
        <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">
          Incrível!
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
  }

  showLoadingState() {
    const elements = ['totalProgress', 'completedTopics', 'studyHours', 'badgesEarned'];
    elements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = '...';
      }
    });
  }

  hideLoadingState() {
    // UI will be updated by updateDashboardUI()
  }

  showLoginPrompt() {
    const container = document.querySelector('.dashboard-grid');
    if (container) {
      container.innerHTML = `
        <div class="login-prompt">
          <div class="login-prompt-content">
            <div class="login-prompt-icon">🔒</div>
            <h2>Faça login para acompanhar seu progresso</h2>
            <p>Conecte-se para salvar seu progresso, ganhar XP e conquistar badges!</p>
            <a href="./auth.html" class="btn btn-primary">Fazer Login</a>
          </div>
        </div>
      `;
    }
  }

  showErrorState(message) {
    console.error('❌ Dashboard Error:', message);
    // Could show error UI here if needed
  }

  setupEventListeners() {
    // Listen for topic completion events from other pages
    window.addEventListener('topicCompleted', (event) => {
      const { roadmapId, topicId, topicTitle, estimatedHours } = event.detail;
      this.markTopicCompleted(roadmapId, topicId, topicTitle, estimatedHours);
    });

    // Listen for manual progress sync
    window.addEventListener('syncProgress', () => {
      this.loadUserProgress();
    });
  }

  // Public method to mark topic completed (for external use)
  static markTopicCompleted(roadmapId, topicId, topicTitle, estimatedHours = 0.5) {
    // Static method to trigger topic completion without instance
    window.dispatchEvent(new CustomEvent('topicCompleted', {
      detail: { roadmapId, topicId, topicTitle, estimatedHours }
    }));
  }
  
  // Process pending events from localStorage (cross-page sync)
  loadProgressFromLocalStorage() {
    try {
      // Try to load guest progress first
      const guestProgress = localStorage.getItem('guestProgress');
      if (guestProgress) {
        const saved = JSON.parse(guestProgress);
        console.log('📦 Loading saved guest progress:', saved);
        
        // Merge saved progress with current
        if (saved.totalXP) this.userProgress.totalXP = saved.totalXP;
        if (saved.level) this.userProgress.level = saved.level;
        if (saved.completedTopics) this.userProgress.completedTopics = saved.completedTopics;
        if (saved.studyHours) this.userProgress.studyHours = saved.studyHours;
        if (saved.badges) this.userProgress.badges = saved.badges;
        if (saved.roadmaps) this.userProgress.roadmaps = saved.roadmaps;
        
        console.log('✅ Guest progress loaded. Total XP:', this.userProgress.totalXP);
      }
      
      // Also check for dashboard data
      const dashboardData = localStorage.getItem('dashboardData');
      if (dashboardData) {
        const data = JSON.parse(dashboardData);
        console.log('📊 Loading saved dashboard data:', data);
        if (data.xp !== undefined) this.userProgress.totalXP = data.xp;
        if (data.level !== undefined) this.userProgress.level = data.level;
      }
      
    } catch (error) {
      console.error('❌ Error loading progress from localStorage:', error);
    }
  }

  processPendingEvents() {
    try {
      const pendingEvents = JSON.parse(localStorage.getItem('dashboardEvents') || '[]');
      
      if (pendingEvents.length > 0) {
        console.log(`🔄 Processing ${pendingEvents.length} pending dashboard events...`);
        
        pendingEvents.forEach(event => {
          if (event.type === 'topicCompleted') {
            console.log('📋 Processing topic completion:', event.data);
            this.markTopicCompleted(
              event.data.roadmapId, 
              event.data.topicId, 
              event.data.topicTitle, 
              event.data.estimatedHours
            );
          }
        });
        
        // Clear processed events
        localStorage.removeItem('dashboardEvents');
        console.log('✅ All pending events processed and cleared');
      } else {
        console.log('ℹ️ No pending dashboard events to process');
      }
    } catch (error) {
      console.error('❌ Error processing pending events:', error);
    }
  }
}

// Export for global use
window.DashboardManager = DashboardManager;

// Auto-initialize if dashboard page
if (document.getElementById('totalProgress')) {
  window.addEventListener('DOMContentLoaded', () => {
    window.dashboardInstance = new DashboardManager();
  });
}

console.log('📊 DashboardManager carregado com sucesso!');
