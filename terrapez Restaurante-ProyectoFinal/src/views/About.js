import Navigation from "../components/Navigation";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-100 to-indigo-300">
      <Navigation />
      <main className="min-h-screen">
        <div className="m-6 sm:m-8 lg:m-10 text-gray-800">
          <div className="flex justify-center">
            <img
              src="https://github.com/Yohana-Gutierrez/imagenes/blob/main/rt/portada.jpg?raw=true"
              alt="Imagen de Facebook"
              className="w-80 h-auto" // Establece el ancho a 24 unidades y el alto se ajusta automáticamente
            />
          </div>

          <div className="mt-4 lg:mt-5 text-center text-indigo-900 font-extrabold text-3xl sm:text-lg lg:text-4xl transition-all duration-300 font-serif">
            <h2 className="uppercase tracking-wider text-4xl sm:text-5xl lg:text-6xl">
              Terrapez Restaurante
            </h2>
          </div>

          <div className="mt-4 lg:mt-5 text-center text-indigo-900 font-extrabold text-lg transition-all duration-300">
            <p className="mt-1 sm:mt-2">
              DE LA LAGUNA A TU MESA
            </p>
          </div>

          <p className="mt-6 sm:mt-8 lg:mt-10 text-lg md:text-xl leading-relaxed">
            Ubicado en el corazón de Comayagua, Terrapez es el destino gastronómico por excelencia
            para los amantes de los mariscos y pescados frescos. Nuestro restaurante ofrece
            una experiencia culinaria única, fusionando la frescura del mar con la pasión por la
            cocina de nuestros chefs expertos.
          </p>
          <br />
          <p className="text-lg md:text-xl leading-relaxed">
            Terrapez: es un nuevo concepto en restaurante y producción de tilapia roja.
            Ofreciendo el mejor pescado frito del valle de Comayagua.
          </p>
          <br />
          <p className="text-lg md:text-xl leading-relaxed">
            Direccion: Km 60 Carretera CA5 a la altura de Flores, Villa de San Antonio, Comayagua Honduras, Villa de San Antonio, Honduras, 12191
          </p>
          <br />
          <p className="text-lg md:text-xl leading-relaxed">
            Telefono: 9754-9957
          </p>

          <div className="mt-12 text-lg text-center">
            <p className="font-bold">
              Hecho por: Cristina Hernandez, Anny Gutierrez, Juan Carlos, Marcia
            </p>
            <p className="font-bold">
              Clase: Programación Orientada a Objetos 2024
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
