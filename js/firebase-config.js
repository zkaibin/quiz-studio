// Firebase configuration for Quiz Studio
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyCJvrCxJ103emuCwBWEYNzfbWjdV8QcO4w",
  authDomain: "quiz-studio-12339.firebaseapp.com",
  projectId: "quiz-studio-12339",
  storageBucket: "quiz-studio-12339.firebasestorage.app",
  messagingSenderId: "575996539322",
  appId: "1:575996539322:web:d9a3baffda5c5867496d83",
  measurementId: "G-2R0K14VKJC"
};

const app = initializeApp(firebaseConfig);

window.FB_AUTH    = getAuth(app);
window.FB_DB      = getFirestore(app);
window.FB_STORAGE = getStorage(app);
