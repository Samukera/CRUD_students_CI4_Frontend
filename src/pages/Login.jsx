import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertError from "../components/AlertError";
import { login } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { setAuthState } = useContext(AuthContext);

  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const history = useNavigate();

  const handleRedirect = () => {
    setTimeout(() => {
      history("/dashboard");
    }, 1000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    const data = await login(email, password);
    if (data.error) {
      setAlertType("error");
      setShowAlert(true);
      const errors = data.message.response.data.message;
      setAlertMessage(errors);
    } else {
      toast.success("Você está sendo redirecionado...");
      setAuthState(data);
      handleRedirect();
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {alertType === "error" ? (
          <AlertError
            message={alertMessage}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        ) : null}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="./school.png"
            alt="Your Company logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            CRUD Student's CodeIgniter 🔥
          </h2>
          <h2 className="mt-10 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                E-mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn normal-case flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não possui uma conta?{" "}
            <Link
              to="/cadastro"
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Cadastre-se agora!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
