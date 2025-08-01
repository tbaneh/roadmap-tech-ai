// Firebase Configuration for Browser
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

// Firebase config - TEMPORÁRIO para testes (usar projeto real)
// TODO: Configurar variáveis de ambiente no Vercel para produção
const firebaseConfig = {
  apiKey: "AIzaSyDemoKey123456789",
  authDomain: "roadmap-tech-demo.firebaseapp.com",
  projectId: "roadmap-tech-demo",
  storageBucket: "roadmap-tech-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo123456789",
  measurementId: "G-DEMO123"
};

console.log('🔥 Firebase config loaded:', firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics not initialized:', error);
  }
}
export { analytics };

export default app;
