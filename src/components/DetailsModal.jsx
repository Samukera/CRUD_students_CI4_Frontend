import React from "react";
import Loading from "./Loading";
import Modal from "react-modal";

export default function DetailModal({ studentData, show, onClose }) {
  if (show && !studentData) {
    return <Loading />;
  }

  if (!studentData) {
    return null;
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center rounded-lg shadow-md p-6 bg-blend-darken"
    >
      <div className="p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Detalhes do estudante</h2>
          <button className="btn btn-ghost" onClick={onClose}>
            X
          </button>
        </div>
        <div className="mb-4">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={studentData.picture} />
            </div>
          </div>
          <p>Nome: {studentData.name}</p>
          <p>E-mail: {studentData.email}</p>
          <p>Telefone: {studentData.fone}</p>
          <p>Endereço: {studentData.address}</p>
          <div>
            <h1 className="font-bold">Informações Extras</h1>
            <p>Criação: {studentData.created_at}</p>
            <p>Última atualização: {studentData.updated_at} </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
