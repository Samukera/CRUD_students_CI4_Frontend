import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AlertSuccess from "../components/AlertSuccess";
import AlertError from "../components/AlertError";

export default function Cadastro() {
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const history = useNavigate();

  const handleRedirect = () => {
    setTimeout(() => {
      history("/");
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.elements.username.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    axios
      .post("http://localhost:8080/api/auth/createLogin", {
        username,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          setAlertType("success");
          setAlertMessage("Cadastro criado com sucesso!");
          setShowAlert(true);
          handleRedirect();
        }
      })
      .catch((error) => {
        setAlertType("error");
        setShowAlert(true);
        if (error.response) {
          // A solicitação foi feita e o servidor respondeu com um código de status fora do intervalo de 2xx
          const errors = error.response.data.messages.errors;
          let errorMessage = "Erros:\n";
          for (const key in errors) {
            errorMessage += `- ${errors[key]}\n`;
          }
          setAlertMessage(errorMessage);
        } else if (error.request) {
          // A solicitação foi feita, mas não houve resposta
          setAlertMessage("Erro: Sem resposta do servidor");
        } else {
          // Algo aconteceu na configuração da solicitação que acionou um erro
          setAlertMessage(`Erro: ${error.message}`);
        }
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {alertType === "success" ? (
          <AlertSuccess
            message={alertMessage}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        ) : (
          <AlertError
            message={alertMessage}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        )}
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
            Cadastro
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome de Usuário
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  title="Por favor use uma senha com mais do que 6 caracteres"
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
                Cadastrar
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Deseja retornar para o ínicio?{" "}
            <Link
              to="/"
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Clique aqui!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
