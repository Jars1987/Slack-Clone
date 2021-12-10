import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const key = process.env.REACT_APP_FIREBAE_API_KEY;

const firebaseConfig = {
  apiKey: key,
  authDomain: 'slack-clone-32e0d.firebaseapp.com',
  projectId: 'slack-clone-32e0d',
  storageBucket: 'slack-clone-32e0d.appspot.com',
  messagingSenderId: '730430796942',
  appId: '1:730430796942:web:8227273f5e1aa00b8b45df',
};

let app;

if (app == null) {
  app = initializeApp(firebaseConfig);
} else {
  app = app();
}

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
