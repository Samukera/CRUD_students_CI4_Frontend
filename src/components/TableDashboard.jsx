import { useContext, useState } from "react";
import { getStudentId, deleteStudent, updateStudent } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import DetailModal from "./DetailsModal";

export default function TableDashboard({ data, onDeleteOnUpdate }) {
  const { authState } = useContext(AuthContext);
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [CurrentStudentId, setCurrentStudentId] = useState(null);
  const [CurrentStudentData, setCurrentStudentData] = useState({});

  const handleOpenRemove = (id) => {
    setOpenRemove(true);
    setCurrentStudentId(id);
  };
  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const handleDeleteStudent = async () => {
    try {
      await deleteStudent(authState.token, CurrentStudentId);
      // handle successful deletion
      onDeleteOnUpdate();
      toast.success("Estudante removido com sucesso!");
    } catch (error) {
      // handle error
      console.error(error);
      toast.error("parece que algo de errado aconteceu!");
    }
    handleCloseRemove();
  };

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setCurrentStudentId(data.id);
    setCurrentStudentData(data);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEditStudent = async (updatedStudentData, id) => {
    try {
      const response = await updateStudent(
        authState.token,
        updatedStudentData,
        id
      );
      if (response.error) {
        toast.error(
          "parece que algo aconteceu! Possíveis erros: dados iguais aos antigos do estudante (mude ao menos um campo por favor!)"
        );
      } else {
        toast.success("Estudante atualizado com sucesso!");
      }

      // handle successful update
    } catch (error) {
      // handle error
      console.error(error);
    }
    handleCloseEdit();
    onDeleteOnUpdate();
  };

  const handleOpenDetails = async (id) => {
    setCurrentStudentId(id);
    setOpenDetails(true);

    try {
      const response = await getStudentId(authState.token, id);
      // set the state with the data returned from the API
      setCurrentStudentData(response.data);
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setCurrentStudentData();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table border mt-2 mb-2">
          {/* head */}
          <thead>
            <tr className="text-[#171D1C]">
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.id} className="hover:bg-gray-200">
                <td>
                  <img
                    className="w-8 avatar rounded-full"
                    src={student.picture}
                    alt={student.name}
                  />
                </td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.fone}</td>
                <td>{student.address}</td>
                <th>
                  <button
                    className="btn btn-info btn-sm m-2"
                    onClick={() => handleOpenDetails(student.id)}
                    // disabled={isLoading}
                  >
                    detalhes
                  </button>
                  <button
                    className="btn btn-warning btn-sm m-2"
                    onClick={() => handleOpenEdit(student)}
                  >
                    editar
                  </button>

                  <button
                    className="btn btn-error btn-sm m-2"
                    onClick={() => handleOpenRemove(student.id)}
                  >
                    excluir
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        onDelete={handleDeleteStudent}
        show={openRemove}
        onClose={handleCloseRemove}
      />
      <EditModal
        show={openEdit}
        onClose={handleCloseEdit}
        studentData={CurrentStudentData}
        onEdit={handleEditStudent}
      />
      <DetailModal
        studentData={CurrentStudentData}
        show={openDetails}
        onClose={handleCloseDetails}
      />
    </>
  );
}
