# 🔥 Firebase Setup Guide

## Passo 1: Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Nome do projeto: `roadmap-tech-ai`
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

## Passo 2: Configurar Authentication

1. No painel do Firebase, vá em **Authentication**
2. Clique em "Começar"
3. Vá na aba **Sign-in method**
4. Habilite os provedores:
   - **Email/Password** ✅
   - **Google** ✅ 
   - **GitHub** ✅

### Configurar Google Provider:
- Adicione seu domínio em "Authorized domains": `roadmap-tech-ai.vercel.app`
- Configure OAuth consent screen no Google Cloud Console

### Configurar GitHub Provider:
- Crie um OAuth App em GitHub Settings
- Authorization callback URL: `https://roadmap-tech-ai.firebaseapp.com/__/auth/handler`

## Passo 3: Configurar Firestore Database

1. Vá em **Firestore Database**
2. Clique em "Criar banco de dados"
3. Escolha **Modo de produção**
4. Selecione localização: `southamerica-east1` (São Paulo)

### Regras de Segurança:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public roadmaps data (read-only)
    match /roadmaps/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Passo 4: Obter Credenciais

1. Vá em **Configurações do projeto** (⚙️)
2. Scroll até "Seus apps"
3. Clique no ícone Web (`</>`)
4. Nome do app: `Roadmap Tech`
5. Marque "Configure Firebase Hosting"
6. Copie as credenciais:

```javascript
const firebaseConfig = {
  apiKey: "sua-api-key-aqui",
  authDomain: "roadmap-tech-ai.firebaseapp.com",
  projectId: "roadmap-tech-ai",
  storageBucket: "roadmap-tech-ai.appspot.com",
  messagingSenderId: "seu-sender-id",
  appId: "seu-app-id",
  measurementId: "seu-measurement-id"
};
```

## Passo 5: Configurar Variáveis de Ambiente

### No Vercel:
1. Vá em Vercel Dashboard → Seu projeto
2. Settings → Environment Variables
3. Adicione as variáveis:

```
FIREBASE_API_KEY=sua-api-key-aqui
FIREBASE_AUTH_DOMAIN=roadmap-tech-ai.firebaseapp.com
FIREBASE_PROJECT_ID=roadmap-tech-ai
FIREBASE_STORAGE_BUCKET=roadmap-tech-ai.appspot.com
FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
FIREBASE_APP_ID=seu-app-id
FIREBASE_MEASUREMENT_ID=seu-measurement-id
```

### Localmente (.env):
```
FIREBASE_API_KEY=sua-api-key-aqui
FIREBASE_AUTH_DOMAIN=roadmap-tech-ai.firebaseapp.com
FIREBASE_PROJECT_ID=roadmap-tech-ai
FIREBASE_STORAGE_BUCKET=roadmap-tech-ai.appspot.com
FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
FIREBASE_APP_ID=seu-app-id
FIREBASE_MEASUREMENT_ID=seu-measurement-id
```

## Passo 6: Instalar Dependências

```bash
# No diretório do projeto
npm install firebase

# Ou usando yarn
yarn add firebase
```

## Passo 7: Testar Autenticação

1. Abra `http://localhost:3000/pages/auth.html`
2. Teste cadastro com email
3. Teste login social (Google/GitHub)
4. Verifique no Firebase Console > Authentication > Users

## Estrutura de Dados Firestore

### Coleção: `users/{uid}`
```javascript
{
  uid: "firebase-user-id",
  email: "user@example.com",
  displayName: "Nome do Usuário",
  photoURL: "https://...",
  createdAt: "2024-01-01T00:00:00.000Z",
  lastLogin: "2024-01-01T00:00:00.000Z",
  preferences: {
    theme: "dark",
    notifications: true,
    emailUpdates: true
  },
  progress: {
    roadmaps: {
      "data-scientist": {
        progress: 25,
        completedSections: ["section1", "section2"],
        totalSections: 8
      }
    },
    completedTopics: ["topic1", "topic2"],
    studyHours: 42,
    badgesEarned: ["first_steps", "quick_learner"],
    xp: 1250,
    level: 3,
    streak: 7,
    longestStreak: 21
  }
}
```

## Troubleshooting

### Erro: "Firebase not defined"
- Verifique se o Firebase SDK está sendo importado corretamente
- Certifique-se que está usando módulos ES6 (`type="module"`)

### Erro: "Auth domain not authorized"
- Adicione seu domínio em Firebase Console > Authentication > Settings > Authorized domains

### Erro: "Popup blocked"
- Configure exceções no navegador para popups do Firebase
- Use redirect ao invés de popup em produção se necessário

## Próximos Passos

1. ✅ Setup básico completo
2. 🔄 Integrar auth state no app principal
3. 🔄 Migrar dados do localStorage
4. 🔄 Implementar sincronização real-time
5. 🔄 Testes em produção
