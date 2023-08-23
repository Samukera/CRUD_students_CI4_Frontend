import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BsPersonPlus } from "react-icons/bs";
import AlertInfo from "../components/AlertInfo";
import TableDashboard from "../components/TableDashboard";
import { createStudent, getAllStudents } from "../api/api";
import Paginator from "../components/Paginator";
import CreateModal from "../components/CreateModal";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(true);
  let user;

  if (authState.user) {
    user = authState.user;
  }

  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [updateStudents, setUpdateStudents] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  if (authState.token) {
    useEffect(() => {
      getAllStudents(authState.token, currentPage).then((response) => {
        setStudents(response.data.data);
        setCurrentPage(response.data.pager.currentPage);
        setLastPage(response.data.pager.lastPage);
      });
    }, [currentPage, updateStudents]);
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteOrUpdateStudent = () => {
    // handle updates when a student is deleted or updated
    setUpdateStudents((prev) => !prev);
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateStudent = async (studentData) => {
    const response = await createStudent(
      authState.token,
      studentData.name,
      studentData.email,
      studentData.fone,
      studentData.address,
      studentData.picture
    );
    //chamar o método que atualiza a dashboard
    if (response.error) {
      toast.error("Verifique os dados de cadastro por favor!");
    } else {
      toast.success("Estudante cadastrado com sucesso!");
      handleCloseCreateModal();
    }

    setUpdateStudents((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-end m-5">
        <button
          className="btn btn-ghost shadow-md btn-sm"
          onClick={handleLogout}
        >
          Sair <FiLogOut />
        </button>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {user ? (
          showAlert ? (
            <AlertInfo
              username={user.data.username}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          ) : null
        ) : null}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            CRUD Student's CodeIgniter 🔥
          </h2>
          <h2 className="mt-10 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
            Dashboard
          </h2>
        </div>
        <div>
          <div className="flex justify-end">
            <button className="btn btn-success" onClick={handleOpenCreateModal}>
              <BsPersonPlus /> Adicionar Novo Estudante
            </button>
          </div>

          <TableDashboard
            data={students}
            onDeleteOnUpdate={handleDeleteOrUpdateStudent}
          />
          <Paginator
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <CreateModal
        show={showCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateStudent}
      />
    </>
  );
}
