import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAiP6h7YE866jxbRnrG4yG44v_zCVZRnqU",
  authDomain: "sifygsa-2dd04.firebaseapp.com",
  projectId: "sifygsa-2dd04",
  storageBucket: "sifygsa-2dd04.firebasestorage.app",
  messagingSenderId: "526441735975",
  appId: "1:526441735975:web:675b9208154cfb2d01ab02",
  measurementId: "G-W0QFY3QBN1"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth }; 