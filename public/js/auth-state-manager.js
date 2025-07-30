// Authentication State Manager
import { authService } from './auth-service.js';

class AuthStateManager {
  constructor() {
    this.isInitialized = false;
    this.currentUser = null;
    this.authCallbacks = [];
    
    this.init();
  }

  async init() {
    // Listen for auth state changes
    window.addEventListener('authStateChanged', (e) => {
      this.handleAuthStateChange(e.detail.state, e.detail.user);
    });

    // Check initial auth state
    this.currentUser = authService.getCurrentUser();
    this.updateUI();
    this.isInitialized = true;
  }

  // Handle authentication state changes
  handleAuthStateChange(state, user) {
    this.currentUser = user;
    
    if (state === 'signed-in') {
      this.onUserSignIn(user);
    } else {
      this.onUserSignOut();
    }
    
    this.updateUI();
    this.notifyCallbacks(state, user);
  }

  // User signed in
  onUserSignIn(user) {
    console.log('✅ User signed in:', user.displayName || user.email);
    
    // Show welcome notification
    this.showNotification(`Bem-vindo, ${user.displayName || user.email}!`, 'success');
    
    // Sync user progress
    this.syncUserProgress();
    
    // Update last login in Firestore will be handled by auth-service
  }

  // User signed out
  onUserSignOut() {
    console.log('👋 User signed out');
    
    // Show goodbye notification
    this.showNotification('Você foi desconectado. Seus dados foram salvos localmente.', 'info');
    
    // Clear any cached data
    this.clearUserCache();
  }

  // Update UI based on auth state
  updateUI() {
    const isSignedIn = !!this.currentUser;
    
    // Update navigation
    this.updateNavigation(isSignedIn);
    
    // Update user avatar/profile
    this.updateUserProfile(isSignedIn);
    
    // Update protected content
    this.updateProtectedContent(isSignedIn);
  }

  // Update navigation menu
  updateNavigation(isSignedIn) {
    // Find all navigation containers
    const navContainers = document.querySelectorAll('.nav-menu, .navigation, nav');
    
    navContainers.forEach(nav => {
      let authSection = nav.querySelector('.auth-section');
      
      // Create auth section if it doesn't exist
      if (!authSection) {
        authSection = document.createElement('div');
        authSection.className = 'auth-section';
        authSection.style.cssText = `
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-left: auto;
        `;
        nav.appendChild(authSection);
      }
      
      // Clear existing content
      authSection.innerHTML = '';
      
      if (isSignedIn) {
        // Show user profile and logout
        const userProfile = this.createUserProfile();
        const logoutBtn = this.createLogoutButton();
        
        authSection.appendChild(userProfile);
        authSection.appendChild(logoutBtn);
      } else {
        // Show login button
        const loginBtn = this.createLoginButton();
        authSection.appendChild(loginBtn);
      }
    });
  }

  // Create user profile element
  createUserProfile() {
    const profile = document.createElement('div');
    profile.className = 'user-profile';
    profile.style.cssText = `
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
    `;
    
    const avatar = document.createElement('img');
    avatar.src = this.currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(this.currentUser.displayName || this.currentUser.email)}&background=3b82f6&color=fff`;
    avatar.alt = 'User Avatar';
    avatar.style.cssText = `
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    `;
    
    const name = document.createElement('span');
    name.textContent = this.currentUser.displayName || this.currentUser.email.split('@')[0];
    name.style.cssText = `
      font-weight: 500;
      color: var(--text-primary);
      font-size: 0.9rem;
    `;
    
    profile.appendChild(avatar);
    profile.appendChild(name);
    
    // Click to go to profile/dashboard
    profile.addEventListener('click', () => {
      window.location.href = './dashboard.html';
    });
    
    profile.addEventListener('mouseenter', () => {
      profile.style.background = 'rgba(59, 130, 246, 0.2)';
      profile.style.transform = 'translateY(-1px)';
    });
    
    profile.addEventListener('mouseleave', () => {
      profile.style.background = 'rgba(59, 130, 246, 0.1)';
      profile.style.transform = 'translateY(0)';
    });
    
    return profile;
  }

  // Create logout button
  createLogoutButton() {
    const button = document.createElement('button');
    button.className = 'logout-btn';
    button.innerHTML = '🚪';
    button.title = 'Sair';
    button.style.cssText = `
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #ef4444;
      padding: 0.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 1.1rem;
    `;
    
    button.addEventListener('click', async () => {
      if (confirm('Tem certeza que deseja sair?')) {
        const result = await authService.signOut();
        if (result.success) {
          // Redirect to home or show message
          if (window.location.pathname.includes('/dashboard') || window.location.pathname.includes('/profile')) {
            window.location.href = '../index.html';
          }
        }
      }
    });
    
    button.addEventListener('mouseenter', () => {
      button.style.background = 'rgba(239, 68, 68, 0.2)';
      button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.background = 'rgba(239, 68, 68, 0.1)';
      button.style.transform = 'scale(1)';
    });
    
    return button;
  }

  // Create login button
  createLoginButton() {
    const button = document.createElement('a');
    button.href = './auth.html';
    button.className = 'login-btn';
    button.textContent = '🔐 Entrar';
    button.style.cssText = `
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-1px) scale(1.02)';
      button.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0) scale(1)';
      button.style.boxShadow = 'none';
    });
    
    return button;
  }

  // Update user profile sections
  updateUserProfile(isSignedIn) {
    if (!isSignedIn) return;
    
    // Update any user profile sections in the page
    const profileSections = document.querySelectorAll('[data-user-profile]');
    
    profileSections.forEach(section => {
      section.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
          <img src="${this.currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(this.currentUser.displayName || this.currentUser.email)}&background=3b82f6&color=fff`}" 
               alt="Avatar" 
               style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;">
          <div>
            <h3 style="margin: 0; color: var(--text-primary);">${this.currentUser.displayName || 'Usuário'}</h3>
            <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">${this.currentUser.email}</p>
          </div>
        </div>
      `;
    });
  }

  // Update protected content visibility
  updateProtectedContent(isSignedIn) {
    // Show/hide elements based on auth state
    const protectedElements = document.querySelectorAll('[data-auth-required="true"]');
    const guestElements = document.querySelectorAll('[data-auth-required="false"]');
    
    protectedElements.forEach(el => {
      el.style.display = isSignedIn ? 'block' : 'none';
    });
    
    guestElements.forEach(el => {
      el.style.display = isSignedIn ? 'none' : 'block';
    });
  }

  // Sync user progress with Firestore
  async syncUserProgress() {
    if (!this.currentUser) return;
    
    try {
      // This will be handled by a dedicated progress sync service
      console.log('🔄 Syncing user progress...');
      
      // For now, just log - we'll implement full sync in the next step
      const localProgress = localStorage.getItem('userProgress');
      if (localProgress) {
        console.log('📊 Local progress found, will sync with Firestore');
      }
    } catch (error) {
      console.error('❌ Error syncing progress:', error);
    }
  }

  // Clear user cache
  clearUserCache() {
    // Clear any cached user data (but keep progress data)
    // This is safe because progress is backed up to Firestore
  }

  // Show notification
  showNotification(message, type = 'info') {
    // Create or find notification container
    let container = document.querySelector('.notification-container');
    
    if (!container) {
      container = document.createElement('div');
      container.className = 'notification-container';
      container.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 10000;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
      success: { bg: 'rgba(16, 185, 129, 0.9)', border: '#10b981' },
      error: { bg: 'rgba(239, 68, 68, 0.9)', border: '#ef4444' },
      info: { bg: 'rgba(59, 130, 246, 0.9)', border: '#3b82f6' },
      warning: { bg: 'rgba(245, 158, 11, 0.9)', border: '#f59e0b' }
    };
    
    const color = colors[type] || colors.info;
    
    notification.style.cssText = `
      background: ${color.bg};
      border: 1px solid ${color.border};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      margin-bottom: 0.5rem;
      backdrop-filter: blur(10px);
      font-weight: 500;
      font-size: 0.9rem;
      pointer-events: auto;
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s ease;
      max-width: 320px;
      word-wrap: break-word;
    `;
    
    notification.textContent = message;
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
  }

  // Subscribe to auth state changes
  onAuthStateChange(callback) {
    this.authCallbacks.push(callback);
    
    // Call immediately with current state
    if (this.isInitialized) {
      callback(this.currentUser ? 'signed-in' : 'signed-out', this.currentUser);
    }
  }

  // Notify all callbacks
  notifyCallbacks(state, user) {
    this.authCallbacks.forEach(callback => {
      try {
        callback(state, user);
      } catch (error) {
        console.error('Error in auth callback:', error);
      }
    });
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser;
  }

  // Require authentication (redirect to login if not authenticated)
  requireAuth(redirectUrl = './auth.html') {
    if (!this.isAuthenticated()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  }
}

// Export singleton instance
export const authStateManager = new AuthStateManager();

// Make it globally available
window.authStateManager = authStateManager;

export default authStateManager;
