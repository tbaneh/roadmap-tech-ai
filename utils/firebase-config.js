// Firebase Configuration for Roadmap Tech
// Following Google's best practices for Firebase AI Logic

// Firebase config (replace with your project config)
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "roadmap-tech-ai.firebaseapp.com",
  projectId: "roadmap-tech-ai",
  storageBucket: "roadmap-tech-ai.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getAiLogic } from 'firebase/ai-logic';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase AI Logic
const aiLogic = getAiLogic(app);

export { aiLogic, app };
