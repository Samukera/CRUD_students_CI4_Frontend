import React, { useState } from "react";
import Modal from "react-modal";
import { returnCode64 } from "../utils/base64";

export default function CreateModal({ show, onClose, onCreate }) {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    fone: "",
    address: "",
    picture: "",
  });
  const [image, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    let newStudentData = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      fone: form.elements.fone.value,
      address: form.elements.address.value,
    };

    const base64Image = await returnCode64(image);
    newStudentData.picture = base64Image;

    setStudentData(newStudentData);

    onCreate(newStudentData);
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center rounded-lg shadow-md p-6 bg-blend-darken"
    >
      <div className="bg-white p-6 m-4 max-w-xl">
        <div className="flex justify-between">
          <h1>Cadastro de novo estudante</h1>
          <button className="btn btn-ghost" onClick={onClose}>
            X
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Samuel Rech Cassanego"
                autoComplete="email"
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
                placeholder="SamuelRC@example.com"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="fone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Telefone
            </label>
            <div className="mt-2">
              <input
                id="fone"
                name="fone"
                type="tel"
                title="Use somente números por favor"
                placeholder="Somente números ex: 977778888"
                // autoComplete="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Endereço
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Rua, Bairro, Nº Casa/AP, CEP, Estado/País"
                autoComplete="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Foto de perfil
            </label>
          </div>
          <div className="mt-2">
            <input
              id="picture"
              name="picture"
              type="file"
              required
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-success normal-case flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2BA779] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
