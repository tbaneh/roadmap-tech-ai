// Firebase Configuration for Browser
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

// Firebase config - TEMPORÁRIO com credenciais de desenvolvimento
// TODO: Configurar variáveis de ambiente no Vercel para produção
const firebaseConfig = {
  apiKey: "AIzaSyC8Q1YjGX6x6vR5K5lL6K5K5K5K5K5K5K5",
  authDomain: "roadmap-tech-ai.firebaseapp.com",
  projectId: "roadmap-tech-ai",
  storageBucket: "roadmap-tech-ai.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345678",
  measurementId: "G-XXXXXXXXXX"
};

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
