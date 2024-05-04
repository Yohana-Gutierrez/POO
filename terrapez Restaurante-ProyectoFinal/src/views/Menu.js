// Menu.js
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import MenuCard from "../components/MenuCard";
import Autocomplete from "../components/Autocomplete";
import Order from "../components/Order";
import Navigation from "../components/Navigation";
import SortButtons from "../components/SortButtons";
import Footer from "../components/Footer";
import useLocalStorage from "../hooks/useLocalStorage";

// Importa la configuración de Firebase
import firebase from "../views/firebase";
import { getAuth } from 'firebase/auth';

const Menu = () => {
  const [menuItems, setMenuItems] = useState(exampleMenu);
  const [currentOrder, setCurrentOrder] = useState({});
  const [currentTotal, setCurrentTotal] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [presentItems, setPresentItems] = useState({});

  useEffect(() => {
    let itemDict = {};
    for (let item of menuItems) {
      itemDict[item.title] = true;
    }
    setPresentItems(itemDict);
  }, [menuItems]);

  useEffect(() => {
    let total = 0;
    for (let i in currentOrder) {
      total += Math.floor(currentOrder[i].quantity * currentOrder[i].price);
    }
    setCurrentTotal(total);
  }, [currentOrder]);

  const confirmOrder = async () => {
    try {
      const finalizedOrder = { ...currentOrder, total: currentTotal };
      
      // Obtener el objeto de autenticación de Firebase
      const auth = getAuth();
      
      // Verificar si hay un usuario autenticado
      if (auth.currentUser) {
        const email = auth.currentUser.email; // Obtener el correo electrónico del usuario autenticado
        
        // Agregar el campo "userEmail" al objeto de orden
        finalizedOrder.userEmail = email;
        
        const db = getFirestore();
        const ordersCollectionRef = collection(db, 'venta');
        await addDoc(ordersCollectionRef, finalizedOrder);
        setCurrentOrder({});
        Swal.fire({
          icon: "success",
          title: "Tu orden fue confirmada!",
        });
      } else {
        console.error("Error: No hay un usuario autenticado.");
      }
    } catch (error) {
      console.error("Error al confirmar la orden:", error);
    }
  };

  const searchMenu = (searchInput) => {
    if (searchInput.length >= 3) {
      const results = exampleMenu.filter(
        (item) =>
          item.title.toLowerCase().includes(searchInput.toLowerCase()) &&
          !presentItems[item.title]
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="bg-gradient-to-b from-indigo-100 to-indigo-300 min-h-screen">
      <Navigation />

      <div className="mt-4 lg:mt-5 flex flex-col justify-center items-center text-center text-indigo-900 font-extrabold sm:text-lg lg:text-xl transition-all duration-300">
        <h2>BIENVENIDO A NUESTRO RESTAURANTE</h2>
        <p className="mt-1 sm:mt-2">Elige el menú de tu preferencia</p>
      </div>

      <SortButtons menuItems={menuItems} setMenuItems={setMenuItems} />

      <main className="grid rows gap-5 sm:gap-7 mt-7">
        {menuItems.length > 0 &&
          menuItems.map((item) => (
            <MenuCard
              title={item.title}
              image={item.image}
              pricePerServing={item.pricePerServing}
              readyInMinutes={item.readyInMinutes}
              key={item.id}
              healthScore={item.healthScore}
              vegan={item.vegan}
              aggregateLikes={item.aggregateLikes}
              currentOrder={currentOrder}
              setCurrentOrder={setCurrentOrder}
            />
          ))}
      </main>

      <section className="flex flex-col justify-center items-center mt-20">
        <div className="justify-center items-center flex flex-col">
          <h3 className="text-indigo-600 sm:text-lg lg:text-xl font-light">
            ¿No encuentras lo que quieres?
          </h3>
          <h1 className="mt-1 text-lg sm:text-xl lg:text-2xl font-semibold text-center text-indigo-600">
            Busca y agrega desde nuestro menú:
          </h1>

          <div>
            <input
              type="text"
              id="search"
              autoComplete="off"
              placeholder="Buscar aquí."
              onChange={(e) => searchMenu(e.target.value)}
              className="mt-2 px-2 py-1 border-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:px-4 sm:mt-3 lg:w-80 shadow-xl transition-all duration-300"
            />

            {!searchResults.length ? (
              ""
            ) : (
              searchResults.map((result) => (
                <Autocomplete
                  title={result.title}
                  id={result.id}
                  setMenuItems={setMenuItems}
                  menuItems={menuItems}
                  key={result.id}
                  presentItems={presentItems}
                  setPresentItems={setPresentItems}
                />
              ))
            )}
          </div>
        </div>

        <div className="mt-10 min-h-[200px] flex flex-col items-center">
          {Object.keys(currentOrder).length > 0 && (
            <>
              <Order
                currentOrder={currentOrder}
                currentTotal={currentTotal}
                setCurrentOrder={setCurrentOrder}
              />
              <button
                onClick={confirmOrder}
                disabled={Object.keys(currentOrder).length === 0}
                className="my-6 px-2 py-2 rounded-lg shadow-xl bg-indigo-600 text-gray-100 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 hover:text-white disabled:opacity-60 disabled:pointer-events-none font-bold disabled:shadow-none text-xl sm:text-2xl"
              >
                HAZ TU ORDEN
              </button>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const exampleMenu = [
  // Aquí va tu lista de items de menú\\
  {  title: "Pescado Frito",
  pricePerServing: 180.00,
  readyInMinutes: 30,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/pescado.jpg?raw=true",
  id: 1,
  healthScore: 301,
  vegan: false,
  aggregateLikes: 67,
  orderNumber: 1, 
},
{
  title: "Terra Marinera",
  pricePerServing: 350.00,
  readyInMinutes: 40,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/sopa.jpg?raw=true",
  id: 2,
  healthScore: 302,
  vegan: false,
  aggregateLikes: 453,
  orderNumber: 2, 
},
{
  title: "Terra Alitas",
  pricePerServing: 1100,
  readyInMinutes: 25,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/alitas.jpg?raw=true",
  id: 3,
  healthScore: 303,
  vegan: false,
  aggregateLikes: 2,
  orderNumber: 3, 
},
{
  title: "Terra Ceviche",
  pricePerServing: 150.00,
  readyInMinutes: 25,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/ceviche.jpg?raw=true",
  id: 4,
  healthScore: 304,
  vegan: false,
  aggregateLikes: 5,
  orderNumber: 4, 
},
{
  title: "Terra Chuleta",
  pricePerServing: 400,
  readyInMinutes: 5,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/chuleta.jpg?raw=true",
  id: 5,
  healthScore: 305,
  vegan: false,
  aggregateLikes: 10,
  orderNumber: 5, 
},
{
  title: "Terra Pollo",
  pricePerServing: 120.00,
  readyInMinutes: 20,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/pollo.jpg?raw=true",
  id: 6,
  healthScore: 306,
  vegan: false,
  aggregateLikes: 204,
  orderNumber: 6, 
},
{
  title: "Terra Camarones",
  pricePerServing: 200.00,
  readyInMinutes: 30,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/camarones.jpg?raw=true",
  id: 7,
  healthScore: 307,
  vegan: false,
  aggregateLikes: 204,
  orderNumber: 7, 
},

{
  title: "Terra Patacones",
  pricePerServing: 200.00,
  readyInMinutes: 30,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/patacones.jpg?raw=true",
  id: 8,
  healthScore: 308,
  vegan: false,
  aggregateLikes: 204,
  orderNumber: 8, 
},
{
  title: "Terra Filete",
  pricePerServing: 200.00,
  readyInMinutes: 30,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/filete.jpg?raw=true",
  id: 9,
  healthScore: 309,
  vegan: false,
  aggregateLikes: 204,
  orderNumber: 9, 
},

{
  title: "Terra Pescado Asado",
  pricePerServing: 200.00,
  readyInMinutes: 30,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/asado.jpg?raw=true",
  id: 10,
  healthScore: 310,
  vegan: false,
  aggregateLikes: 204,
  orderNumber: 10, 
},
{
  title: "Terra Michelada",
  pricePerServing: 120.00,
  readyInMinutes: 30,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/michelada.jpg?raw=true",
  id: 11,
  healthScore: 77,
  vegan: false,
  aggregateLikes: 504,
  orderNumber: 11, 
},
{
  title: "Terra Maracuya",
  pricePerServing: 50.00,
  readyInMinutes: 1,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/maracuya.jpg?raw=true",
  id: 12,
  healthScore: 78,
  vegan: false,
  aggregateLikes: 506,
  orderNumber: 12, 
},
{
  title: "Terra Piña Colada",
  pricePerServing: 200.00,
  readyInMinutes: 10,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/pi%C3%B1a.jpg?raw=true",
  id: 13,
  healthScore: 79,
  vegan: false,
  aggregateLikes: 508,
  orderNumber: 13, 
},

{
  title: "Terra Limonada",
  pricePerServing: 50.00,
  readyInMinutes: 10,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/limonada.jpg?raw=true",
  id: 14,
  healthScore: 80,
  vegan: false,
  aggregateLikes: 509,
  orderNumber: 14, 
},
{
  title: "Terra Desayuno Completo",
  pricePerServing: 40.00,
  readyInMinutes: 10,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/completo.jpg?raw=true",
  id: 15,
  healthScore: 96,
  vegan: false,
  aggregateLikes: 204,
  orderNumber: 15, 
},
{
  title: "Terra Desayuno tipico",
  pricePerServing: 40.00,
  readyInMinutes: 10,
  image:
    "https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/tipico.jpg?raw=true",
  id: 16,
  healthScore: 97,
  vegan: false,
  aggregateLikes: 204,
  orderNumber: 16, 
},
{
  title: "Terra baleadas",
  pricePerServing: 15.00,
  readyInMinutes: 15,
  image:
    "https://comidashonduras.com/wp-content/uploads/2022/12/Baleada-cn-huevo-y-aguacate.jpg",
  id: 17,
  healthScore: 98,
  vegan: false,
  aggregateLikes: 17,
  orderNumber: 17, 
},
{
  title: "Terra Waffles",
  pricePerServing: 45.00,
  readyInMinutes: 15,
  image:
    "https://cravinghomecooked.com/wp-content/uploads/2019/02/easy-waffle-recipe-1-16.jpg",
  id: 18,
  healthScore: 99,
  vegan: false,
  aggregateLikes: 204,
  orderNumber: 18, 
},
{
  title: "Terra panqueques",
  pricePerServing: 45.00,
  readyInMinutes: 10,
  image:
    "https://www.bancodealimentoschicago.org/wp-content/uploads/2023/08/pancakes-900x600-1.jpg",
  id: 19,
  healthScore: 100,
  vegan: false,
  aggregateLikes: 204,
  orderNumber: 19, 
  
},
];

export default Menu;