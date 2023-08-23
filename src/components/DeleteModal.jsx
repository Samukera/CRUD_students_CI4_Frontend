import React from "react";
import Modal from "react-modal";

export default function DeleteModal({ onDelete, show, onClose }) {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center rounded-lg shadow-md p-6 bg-blend-darken"
    >
      <div className="p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Excluir estudante</h2>
          <button className="btn btn-ghost" onClick={onClose}>
            X
          </button>
        </div>

        <p>Tem certeza de que deseja excluir este estudante?</p>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onDelete}
        >
          Excluir
        </button>
      </div>
    </Modal>
  );
}
