// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyBwsK7NFs_WToZdrYmOV6sP1iC0kR9Gxqw",
    authDomain: "authroles-500b7.firebaseapp.com",
    projectId: "authroles-500b7",
    storageBucket: "authroles-500b7.appspot.com",
    messagingSenderId: "829130717297",
    appId: "1:829130717297:web:0b625f519a9f7495b283d0"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
