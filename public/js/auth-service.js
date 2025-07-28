// Authentication Service
import { auth, db } from '../config/firebase-config.js';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.providers = {
      google: new GoogleAuthProvider(),
      github: new GithubAuthProvider()
    };
    
    // Configure providers
    this.providers.google.addScope('profile');
    this.providers.google.addScope('email');
    this.providers.github.addScope('user:email');
    
    this.initializeAuthListener();
  }

  // Initialize authentication state listener
  initializeAuthListener() {
    onAuthStateChanged(auth, async (user) => {
      this.currentUser = user;
      
      if (user) {
        // User is signed in
        await this.handleUserSignIn(user);
        this.notifyAuthStateChange('signed-in', user);
      } else {
        // User is signed out
        this.notifyAuthStateChange('signed-out', null);
      }
    });
  }

  // Handle user sign in (create/update user document)
  async handleUserSignIn(user) {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // New user - create document and migrate localStorage data
        await this.createUserDocument(user);
        await this.migrateLocalStorageData(user.uid);
      } else {
        // Existing user - update last login
        await updateDoc(userRef, {
          lastLogin: new Date().toISOString(),
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      }
    } catch (error) {
      console.error('❌ Error handling user sign in:', error);
    }
  }

  // Create new user document in Firestore
  async createUserDocument(user) {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      preferences: {
        theme: 'dark',
        notifications: true,
        emailUpdates: true
      },
      progress: {
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
        longestStreak: 0
      }
    };

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userData);
    console.log('✅ User document created successfully');
  }

  // Migrate existing localStorage data to Firestore
  async migrateLocalStorageData(uid) {
    try {
      const localProgress = localStorage.getItem('userProgress');
      if (!localProgress) return;

      const progressData = JSON.parse(localProgress);
      const userRef = doc(db, 'users', uid);
      
      await updateDoc(userRef, {
        'progress.roadmaps': progressData.roadmaps || {},
        'progress.completedTopics': progressData.completedTopics || [],
        'progress.studyHours': progressData.studyHours || 0,
        'progress.badgesEarned': progressData.badgesEarned || [],
        'progress.lastStudyDate': progressData.lastStudyDate || null,
        'progress.tasksCompleted': progressData.tasksCompleted || 0,
        'progress.questionsAnswered': progressData.questionsAnswered || 0,
        migratedAt: new Date().toISOString()
      });

      console.log('✅ LocalStorage data migrated successfully');
      
      // Optional: Clear localStorage after successful migration
      // localStorage.removeItem('userProgress');
    } catch (error) {
      console.error('❌ Error migrating localStorage data:', error);
    }
  }

  // Email/Password Registration
  async registerWithEmail(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with display name
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      
      // Send email verification
      await sendEmailVerification(user);
      
      return { success: true, user, message: 'Conta criada! Verifique seu email.' };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  }

  // Email/Password Login
  async signInWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  }

  // Social Login (Google/GitHub)
  async signInWithProvider(providerName) {
    try {
      const provider = this.providers[providerName];
      if (!provider) {
        throw new Error('Provider not supported');
      }
      
      const result = await signInWithPopup(auth, provider);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  }

  // Sign Out
  async signOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  }

  // Password Reset
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: 'Email de recuperação enviado!' };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser;
  }

  // Notify auth state changes
  notifyAuthStateChange(state, user) {
    const event = new CustomEvent('authStateChanged', {
      detail: { state, user }
    });
    window.dispatchEvent(event);
  }

  // Get user-friendly error messages
  getErrorMessage(error) {
    const errorMessages = {
      'auth/user-not-found': 'Usuário não encontrado.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/email-already-in-use': 'Este email já está em uso.',
      'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
      'auth/invalid-email': 'Email inválido.',
      'auth/user-disabled': 'Esta conta foi desabilitada.',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
      'auth/popup-closed-by-user': 'Login cancelado pelo usuário.',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.'
    };
    
    return errorMessages[error.code] || error.message || 'Erro desconhecido.';
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
