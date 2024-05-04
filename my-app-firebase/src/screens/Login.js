import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Asegúrate de importar correctamente los métodos necesarios de Firebase

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = ({ setActiveUser }) => {
  const emailRef = useRef();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const logIn = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Verificar si el inicio de sesión fue exitoso
      if (user) {
        // Redirigir al usuario al menú después de iniciar sesión
        history.push('/menu');
        // Establecer el usuario activo (puedes ajustar esto según tu lógica de la aplicación)
        setActiveUser(user.email);
      }
    } catch (error) {
      // Manejar errores de inicio de sesión
      Swal.fire({
        icon: "error",
        title: "Error logging in.",
        text: error.message,
      });
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-400 to-indigo-800">
      <h1 className="ml-5 mr-5 text-3xl sm:text-4xl lg:text-5xl text-gray-100 font-extrabold text-center">
        Welcome back!
      </h1>

      <div className="mt-1 bg-gradient-to-l from-indigo-600 to-indigo-200 rounded-lg w-1/2 h-2 sm:h-3 sm:max-w-md lg:h-4"></div>

      <div className="mt-7 w-9/12 max-w-lg px-6 py-3 bg-white border-2 rounded-lg shadow-lg hover:border-indigo-500 transition-all duration-300">
        <div className="text-center border-b-2 sm:border-b-4">
          <h3 className="p-1 font-extrabold text-xl text-gray-700 sm:text-2xl lg:text-3xl sm:mb-1">
            Log in
          </h3>
        </div>

        <form
          onSubmit={logIn}
          className="flex flex-col mt-3 sm:text-lg transition-all duration-300"
        >
          <label
            htmlFor="email"
            className="flex items-center mt-1 text-lg font-bold text-gray-700"
          >
            Email:
            <span className={validEmail ? "" : "hidden"}>
              <FontAwesomeIcon
                icon={faCheck}
                className="block ml-1 h-6 w-6 text-green-600"
              />
            </span>
            <span className={!email || validEmail ? "hidden" : ""}>
              <FontAwesomeIcon
                icon={faTimes}
                className="block ml-1 h-6 w-6 text-red-600"
              />
            </span>
          </label>

          <input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="mt-1 input-indigo"
          />

          <div
            className={
              emailFocus && email && !validEmail
                ? "flex items-center mt-1"
                : "sr-only"
            }
          >
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-indigo-500 h-5 w-5"
            />
            <p className="ml-2 font-semibold text-gray-800">
              {!validEmail
                ? "Write a valid Email address."
                : "This account already exists."}
            </p>
          </div>

          <label
            htmlFor="password"
            className="flex items-center mt-2 text-lg font-bold text-gray-700"
          >
            Password:
            <span className={validPassword ? "" : "hidden"}>
              <FontAwesomeIcon
                icon={faCheck}
                className="block ml-1 h-6 w-6 text-green-600"
              />
            </span>
            <span className={validPassword || !password ? "hidden" : ""}>
              <FontAwesomeIcon
                icon={faTimes}
                className="block ml-1 h-6 w-6 text-red-600"
              />
            </span>
          </label>

          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            className="mt-1 input-indigo"
          />

          <div
            className={
              passwordFocus && !validPassword
                ? "flex items-center mt-1"
                : "sr-only"
            }
          >
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-indigo-500 h-5 w-5"
            />
            <p className="ml-2 font-semibold text-gray-800">
              8 to 24 characters.
            </p>
          </div>

          <button
            disabled={!validEmail || !validPassword}
            className="mt-4 py-2 rounded-lg shadow-xl bg-indigo-500 text-gray-100 hover:bg-indigo-600 hover:text-white disabled:opacity-60 disabled:pointer-events-none font-bold disabled:shadow-none text-xl sm:text-2xl"
          >
            Enter
          </button>
        </form>
        <div className="mt-3 flex text-gray-700 font-semibold sm:text-lg">
          <p>
            Not registered?{" "}
            <Link
              to="/register"
              className="text-indigo-500 text-lg sm:text-xl font-bold hover:text-indigo-700"
            >
              Create an account.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
