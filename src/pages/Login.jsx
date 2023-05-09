import React, { useEffect, useState } from "react";
import { authLogin } from "../data/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    correo: "",
    contrasena: "",
  });

  const handleSumbit = ({ target }) => {
    setdata({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleOnSumbit = (e) => {
    e.preventDefault();
    authLogin(data, navigate);
  };
  useEffect(()=>{
    localStorage.clear()
  },[])

  return (
    <div
      className="container-fluid bg-secondary   d-flex  justify-content-center  align-items-center   "
      style={{ height: "100vh" }}
    >
      <div className="row  p-5  w-75  text-white   ">
        <div className="col-6">
          <img
            src="https://fondosmil.com/fondo/517.jpg"
            className="w-100 h-100"
            alt=""
          />
        </div>
        <div className="col-5 bg-dark">
          <h1 className="fs-2 text-center pt-3">Inicio de Sesion 🧩</h1>
          <form className="p-2 " onSubmit={handleOnSumbit}>
            <div className="mb-3">
              <label  className="form-label">
                correo
              </label>
              <input
                type="text"
                className="form-control"
                name="correo"
                placeholder="example@gmail.com"
                onChange={handleSumbit}
              />
            </div>
            <div className="mb-3">
              <label  className="form-label">
                contrasena
              </label>
              <input
                type="password"
                className="form-control"
                name="contrasena"
                placeholder="***********"
                onChange={handleSumbit}
              />
            </div>
            <button className="btn btn-primary w-100 my-4">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
