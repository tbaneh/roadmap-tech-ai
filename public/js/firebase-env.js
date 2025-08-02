// 🔥 Firebase Environment Configuration
// Configure estas variáveis para produção

// Para usar no Vercel/Netlify, adicione essas variáveis nas configurações do projeto:
// VITE_FIREBASE_API_KEY=sua_chave_aqui
// VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
// etc...

// ⚠️ INSTRUÇÕES PARA CONFIGURAÇÃO:
// 1. Vá em https://console.firebase.google.com/
// 2. Selecione seu projeto ou crie um novo: "roadmap-tech-ai"
// 3. Vá em Configurações do projeto → Seus apps → Configuração do SDK
// 4. Copie as credenciais e substitua os valores abaixo
// 5. Para produção, configure essas variáveis no Vercel/Netlify

// 🚨 PARA CONFIGURAR EM PRODUÇÃO:
// No Vercel: Settings → Environment Variables
// No Netlify: Site settings → Environment variables

// ✅ Configuração REAL do Firebase - Credenciais atualizadas!
window.FIREBASE_API_KEY = "AIzaSyC8x0T1U8ipZtGC4ESQNU8utl1iloxLc74";
window.FIREBASE_AUTH_DOMAIN = "roadmap-tech-ai.firebaseapp.com";
window.FIREBASE_PROJECT_ID = "roadmap-tech-ai";
window.FIREBASE_STORAGE_BUCKET = "roadmap-tech-ai.firebasestorage.app";
window.FIREBASE_MESSAGING_SENDER_ID = "1053154739627";
window.FIREBASE_APP_ID = "1:1053154739627:web:9faf21f339b492e2f87eee";
window.FIREBASE_MEASUREMENT_ID = "G-VYEV22VB35";

console.log('🔥 Firebase Environment Variables loaded');
console.log('📝 Para configurar em produção, veja: docs/FIREBASE_SETUP.md');
