import { useEffect, useState } from "react";
import Modal from "react-modal";
import { returnCode64 } from "../utils/base64";

export default function EditModal({ show, onClose, studentData, onEdit }) {
  const [updatedStudentData, setUpdatedStudentData] = useState(studentData);

  const [image, setImage] = useState("");

  useEffect(() => {
    setUpdatedStudentData(studentData);
  }, [studentData]);

  const handleModalClose = () => {
    setUpdatedStudentData(studentData);
    onClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedStudentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const changedFields = {};
    Object.keys(updatedStudentData).forEach((key) => {
      if (updatedStudentData[key] !== studentData[key]) {
        changedFields[key] = updatedStudentData[key];
      }
    });
    if (image !== "") {
      const base64Image = await returnCode64(image);
      changedFields["picture"] = base64Image;
    }
    if (Object.keys(changedFields).length === 0) {
      delete updatedStudentData.picture;
      onEdit(updatedStudentData, studentData.id);
    } else {
      onEdit(changedFields, studentData.id);
    }
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleModalClose}
      className="fixed inset-0 flex items-center justify-center rounded-lg shadow-md p-6 bg-blend-darken"
    >
      <div className="bg-white p-6 m-4 max-w-xl">
        <div className="flex justify-between">
          <h1>Atualizando cadastro do estudante</h1>
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
                value={updatedStudentData ? updatedStudentData.name : ""}
                onChange={handleInputChange}
                autoComplete="email"
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
                value={updatedStudentData ? updatedStudentData.email : ""}
                onChange={handleInputChange}
                autoComplete="email"
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
                type="text"
                placeholder="9 7777-8888"
                value={updatedStudentData ? updatedStudentData.fone : ""}
                onChange={handleInputChange}
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
                value={updatedStudentData ? updatedStudentData.address : ""}
                onChange={handleInputChange}
                autoComplete="text"
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
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-success normal-case flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2BA779] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
