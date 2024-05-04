import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importa la función getAuth

const firebaseConfig = {
  apiKey: "AIzaSyDwCjUMC-uLnVpXxQUd60tv6uilJahDka8",
  authDomain: "terrapez-20772.firebaseapp.com",
  projectId: "terrapez-20772",
  storageBucket: "terrapez-20772.appspot.com",
  messagingSenderId: "28767434491",
  appId: "1:28767434491:web:716ff0e70788a8b15ee25e"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); // Obtiene una instancia de Firestore
const auth = getAuth(firebaseApp); // Obtiene una instancia de Auth

// Exporta la instancia predeterminada de Firebase, la instancia de Firestore, la instancia de Auth y las funciones de inicialización
export { firebaseApp, db, auth, initializeApp, getFirestore, getAuth };