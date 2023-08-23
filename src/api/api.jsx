import jwtDecode from "jwt-decode";
import Axios from "axios";

export const apiUrl = "http://localhost:8080";

export const login = async (email, password) => {
  try {
    const response = await Axios.post(`${apiUrl}/api/auth/login`, {
      email,
      password,
    });
    const data = response.data;

    return {
      token: data.token,
      data: jwtDecode(data.token).data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const getAllStudents = async (token, currentPage) => {
  try {
    const response = await Axios.get(
      `${apiUrl}/api/student/listStudent?page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    return {
      data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const getStudentId = async (token, id) => {
  try {
    const response = await Axios.get(
      `${apiUrl}/api/student/listStudent/${id}`,
      {
        // withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data.data;

    return {
      data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const deleteStudent = async (token, id) => {
  try {
    const response = await Axios.delete(
      `${apiUrl}/api/student/deleteStudent/${id}`,
      {
        // withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response;

    return {
      data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const createStudent = async (
  token,
  name,
  email,
  fone,
  address,
  picture
) => {
  try {
    const response = await Axios.post(
      `${apiUrl}/api/student/createStudent`,
      {
        name,
        email,
        fone,
        address,
        picture,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return {
      data: data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const updateStudent = async (token, dataUpdated, id) => {
  try {
    const response = await Axios.put(
      `${apiUrl}/api/student/updateStudent/${id}`,
      dataUpdated,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return {
      data: data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
