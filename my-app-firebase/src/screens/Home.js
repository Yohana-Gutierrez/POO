import React from 'react'
import AdminView from "../components/AdminView";
import UserView from "../components/AdminView";
import firebaseApp from '../firebase/credenciales';
import { getAuth, signOut } from 'firebase/auth';
const auth=getAuth(firebaseApp);

 function Home({user}) {
  return (
    <div>Home

        <button onClick={()=> signOut(auth)} > Cerrar Sesion</button>

        {user.rol= "Admin" ? <AdminView /> : <UserView />}
    </div>
  )
}
export default Home;