import axios from "axios";
import Swal from "sweetalert2";
const URL = "http://localhost:3000/api/user";
const URL_USERS = "http://localhost:3000/api/users";

export const authLogin = async (data, navigate) => {
  try {
    console.log(data);
    const response = await axios.post(URL, data);
    console.log(response);

    if (response.status === 200 && response.data) {
      Swal.fire({
        icon: "success",
        title: await response.data.message,
        timer: 2000,
      }).then(() => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const rolElegido = response.data.rol[0];
        console.log(rolElegido);
        switch (rolElegido.name) {
          case "admin":
            navigate("/admin");
            break;

          case "moderador":
            navigate("/moderador");
            break;

          case "user":
            navigate("/user");
            break;

          default:
            navigate("/");
        }
      });
    }
  } catch (error) {
    if (error.response.status === 400) {
      Swal.fire({
        icon: "error",
        title: error.response.data,
        timer: 1000,
      });
    }
  }
};

export const getUser = async (navigate) => {
  try {
    const response = await axios.get(URL_USERS, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      Swal.fire({
        icon: "error",
        title: error.response.data,
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        return navigate("/");
      });
    }
  }
};
