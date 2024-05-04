import React, {useState} from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import "./screens/Login.css";// Importar el archivo CSS aquí
const auth= getAuth(firebaseApp);
const firestore=getFirestore(firebaseApp);

function App() {
  const  [user, setUser]=useState(null);
  async function getRol(uid){ 
    const docuRef=doc(firestore, `usuarios/${uid}`);
    const docuCifrada=await  getDoc(docuRef);
    const infoFinal=docuCifrada.data().rol;
    return infoFinal;

  }

  function setUserWithFirebaseAndRoll(usuarioFirebase){
     getRol(usuarioFirebase.uid).then((rol) =>{
       const userData={
      uid: usuarioFirebase.uid,
      email: usuarioFirebase.email,
      rol: rol,
       };

       setUser(userData);
       console.log("userData final", userData);
    });
  }

onAuthStateChanged(auth,(usuarioFirebase)=> {
  if (usuarioFirebase){
    if (!user){
      setUserWithFirebaseAndRoll(usuarioFirebase);
    } 

  }else{
    setUser(null);
  }
})
  return    <>{user ? <Home user={user} />: <Login/>}
    </> ;
}

export default App;
