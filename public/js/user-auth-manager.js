// 🔥 User Authentication Manager - Sistema de Usuário Logado
// Gerencia estado de autenticação e personalização da interface

// Carrega configuração do Firebase
import('./firebase-env.js').then(() => {
    console.log('🔥 Firebase environment loaded for user auth');
    initializeUserAuth();
});

function initializeUserAuth() {
    // Inicializar Firebase se não estiver inicializado
    if (!firebase.apps.length) {
        const firebaseConfig = {
            apiKey: window.FIREBASE_API_KEY,
            authDomain: window.FIREBASE_AUTH_DOMAIN,
            projectId: window.FIREBASE_PROJECT_ID,
            storageBucket: window.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: window.FIREBASE_MESSAGING_SENDER_ID,
            appId: window.FIREBASE_APP_ID,
            measurementId: window.FIREBASE_MEASUREMENT_ID
        };
        firebase.initializeApp(firebaseConfig);
    }

    const auth = firebase.auth();
    
    // Listener para mudanças no estado de autenticação
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('👤 Usuário logado:', user.displayName || user.email);
            showLoggedInUser(user);
        } else {
            console.log('🚪 Usuário não logado');
            showLoggedOutState();
        }
    });
}

// Exibir interface para usuário logado
function showLoggedInUser(user) {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    // Remove botão de login se existir
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.remove();
    
    // Remove perfil existente se já estiver presente
    const existingProfile = document.getElementById('user-profile');
    if (existingProfile) existingProfile.remove();
    
    // Criar elemento de perfil do usuário
    const userProfile = document.createElement('div');
    userProfile.id = 'user-profile';
    userProfile.className = 'user-profile';
    userProfile.innerHTML = `
        <div class="user-info">
            <img src="${user.photoURL || 'https://via.placeholder.com/32/3b82f6/ffffff?text=' + (user.displayName?.[0] || user.email[0]).toUpperCase()}" 
                 alt="Foto do perfil" class="user-avatar">
            <div class="user-details">
                <span class="user-name">${user.displayName || user.email.split('@')[0]}</span>
                <span class="user-email">${user.email}</span>
            </div>
        </div>
        <div class="user-menu">
            <button class="user-menu-btn" onclick="toggleUserMenu()">⚙️</button>
            <div class="user-dropdown" id="user-dropdown">
                <a href="./dashboard.html" class="dropdown-item">📊 Meu Dashboard</a>
                <a href="./profile.html" class="dropdown-item">👤 Perfil</a>
                <button onclick="logoutUser()" class="dropdown-item logout-btn">🚪 Sair</button>
            </div>
        </div>
    `;
    
    // Inserir antes do botão de tema
    const themeToggle = document.getElementById('theme-toggle');
    navLinks.insertBefore(userProfile, themeToggle);
    
    // Adicionar estilos CSS
    addUserProfileStyles();
    
    // Personalizar mensagem de boas-vindas se estiver na homepage
    personalizeHomepage(user);
}

// Exibir interface para usuário não logado
function showLoggedOutState() {
    // Remove perfil do usuário se existir
    const userProfile = document.getElementById('user-profile');
    if (userProfile) userProfile.remove();
    
    // Adicionar botão de login se não existir
    let loginBtn = document.getElementById('login-btn');
    if (!loginBtn) {
        const navLinks = document.querySelector('.nav-links');
        const themeToggle = document.getElementById('theme-toggle');
        
        loginBtn = document.createElement('a');
        loginBtn.id = 'login-btn';
        loginBtn.href = './auth.html';
        loginBtn.className = 'btn btn-login';
        loginBtn.innerHTML = '🔑 Entrar';
        
        navLinks.insertBefore(loginBtn, themeToggle);
    }
    
    // Remover personalização da homepage
    resetHomepagePersonalization();
}

// Personalizar homepage para usuário logado
function personalizeHomepage(user) {
    const heroTitle = document.querySelector('.hero h1');
    const heroDescription = document.querySelector('.hero p');
    
    if (heroTitle && window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        // Salvar conteúdo original se não foi salvo ainda
        if (!heroTitle.dataset.originalContent) {
            heroTitle.dataset.originalContent = heroTitle.innerHTML;
            heroDescription.dataset.originalContent = heroDescription.innerHTML;
        }
        
        // Personalizar conteúdo
        const firstName = user.displayName?.split(' ')[0] || user.email.split('@')[0];
        heroTitle.innerHTML = `
            Bem-vindo de volta, <span class="highlight">${firstName}!</span>
        `;
        heroDescription.innerHTML = `
            Continue sua jornada em tech. Seus roadmaps personalizados e progresso te aguardam.
        `;
        
        // Atualizar botões CTA
        const btnGroup = document.querySelector('.btn-group');
        if (btnGroup && !btnGroup.dataset.personalized) {
            btnGroup.dataset.personalized = 'true';
            btnGroup.innerHTML = `
                <a href="./dashboard.html" class="btn btn-primary">
                    📊 Meu Dashboard
                </a>
                <a href="./roadmaps.html" class="btn btn-secondary">
                    🎯 Continuar Trilhas
                </a>
            `;
        }
    }
}

// Resetar personalização da homepage
function resetHomepagePersonalization() {
    const heroTitle = document.querySelector('.hero h1');
    const heroDescription = document.querySelector('.hero p');
    const btnGroup = document.querySelector('.btn-group');
    
    if (heroTitle && heroTitle.dataset.originalContent) {
        heroTitle.innerHTML = heroTitle.dataset.originalContent;
        heroDescription.innerHTML = heroDescription.dataset.originalContent;
        
        // Resetar botões CTA
        if (btnGroup && btnGroup.dataset.personalized) {
            btnGroup.dataset.personalized = '';
            btnGroup.innerHTML = `
                <a href="./roadmaps.html" class="btn btn-primary">
                    🎯 Explorar Roadmaps
                </a>
                <a href="#features" class="btn btn-secondary">
                    📚 Saber Mais
                </a>
            `;
        }
    }
}

// Adicionar estilos CSS para perfil do usuário
function addUserProfileStyles() {
    if (document.getElementById('user-profile-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'user-profile-styles';
    styles.textContent = `
        .user-profile {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            position: relative;
            margin-right: 1rem;
        }
        
        .user-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
        }
        
        .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid #3b82f6;
            object-fit: cover;
        }
        
        .user-details {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        
        .user-name {
            font-weight: 600;
            font-size: 0.875rem;
            color: #ffffff;
        }
        
        .user-email {
            font-size: 0.75rem;
            color: #94a3b8;
        }
        
        .user-menu-btn {
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            font-size: 1rem;
            padding: 0.25rem;
            border-radius: 0.25rem;
            transition: all 0.2s;
        }
        
        .user-menu-btn:hover {
            background: rgba(59, 130, 246, 0.1);
            color: #3b82f6;
        }
        
        .user-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            min-width: 200px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s;
            z-index: 1000;
        }
        
        .user-dropdown.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .dropdown-item {
            display: block;
            padding: 0.75rem 1rem;
            color: #ffffff;
            text-decoration: none;
            border: none;
            background: none;
            width: 100%;
            text-align: left;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .dropdown-item:hover {
            background: rgba(59, 130, 246, 0.1);
        }
        
        .logout-btn {
            border-top: 1px solid #334155;
            color: #ef4444 !important;
        }
        
        .logout-btn:hover {
            background: rgba(239, 68, 68, 0.1) !important;
        }
        
        .btn-login {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s;
            margin-right: 1rem;
        }
        
        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        @media (max-width: 768px) {
            .user-details {
                display: none;
            }
            
            .user-profile {
                margin-right: 0.5rem;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

// Funções globais
window.toggleUserMenu = function() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
};

window.logoutUser = function() {
    firebase.auth().signOut().then(() => {
        console.log('🚪 Logout realizado com sucesso');
        window.location.href = '/';
    }).catch((error) => {
        console.error('❌ Erro no logout:', error);
    });
};

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('user-dropdown');
    const menuBtn = document.querySelector('.user-menu-btn');
    
    if (dropdown && !dropdown.contains(e.target) && !menuBtn?.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

console.log('🎯 User Authentication Manager carregado');
