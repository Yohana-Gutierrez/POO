// Profile.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { getAuth, deleteUser } from 'firebase/auth';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../views/firebase';
import useLocalStorage from "../hooks/useLocalStorage";
import SavedOrder from "../components/SavedOrder";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [activeUser, setActiveUser] = useLocalStorage("activeUser", [
    false,
    "",
  ]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const q = query(collection(db, "venta"), where("userEmail", "==", user.email));
          const querySnapshot = await getDocs(q);
          const fetchedOrders = [];
          querySnapshot.forEach((doc) => {
            fetchedOrders.push(doc.data());
          });
          setOrders(fetchedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const logOff = () => {
    Swal.fire({
      icon: "question",
      title: "Do you want to log out?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setActiveUser([false, ""]);
        window.location.reload();
      }
    });
  };

  const deleteAccount = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will permanently delete your account.",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const auth = getAuth();
        const user = auth.currentUser;

        deleteUser(user)
          .then(() => {
            setActiveUser([false, ""]);
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error deleting account:", error);
          });
      }
    });
  };

  return (
    <div className="bg-gradient-to-b from-indigo-100 to-indigo-300 min-h-screen">
      <Navigation />

      <div className="flex justify-end mt-3 mr-4 sm:mt-4 sm:mr-6 lg:mt-5 lg:mr-7">
        <button
          onClick={logOff}
          className="mr-1 sm:mr-2 p-1 lg:p-2 bg-indigo-100 text-indigo-700 border-2 border-indigo-600  hover:bg-white font-bold hover:text-indigo-800 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
          Cerrar Sesion
        </button>
        <button
          onClick={deleteAccount}
          className="mr-1 p-1 lg:p-2 bg-red-500 text-gray-100 border-2 border-red-700 hover:bg-red-600 hover:text-white font-extrabold transition-all duration-300"
        >
          Borrar Cuenta{" "}
        </button>
      </div>

      <div className="min-h-screen">
        {orders.length === 0 ? (
          <p className="m-6 sm:m-8 lg:m-10 text-lg md:text-xl text-center text-indigo-900 font-semibold">
            Una vez que hayas ordenado tus pedidos apareceran aqui.Que tengas un buen dia!
          </p>
        ) : (
          <main className="mx-10 mb-10 grid rows gap-5 sm:gap-7 mt-7">
            {orders.map((savedOrder, index) => (
              <SavedOrder key={index} order={savedOrder} number={index} />
            ))}
          </main>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;