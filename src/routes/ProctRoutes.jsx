import { useState, useEffect } from "react";
import jwtDecoded from "jwt-decode";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const URL = "http://localhost:3000/api/use/";

export function ProctRoutes({ children }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({});
  const [usuarioCargado, setUsuarioCargado] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecoded(token);
        const Usuario = async () => {
          const { data } = await axios.get(`${URL}${decodedToken.id}`);
          setUsuario(data);
          setUsuarioCargado(true);
        };
        if (!usuarioCargado) {
          Usuario();
        }
      } catch (error) {
        <Navigate to={"/"}/>
      }
    }else{
        navigate("/");
    }
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }
  if (usuarioCargado) {
    const isUsuario = usuario.roles.map((r) => r.name).includes("moderador");
    const isAdministrador = usuario.roles.map((r) => r.name).includes("admin");
    if(isAdministrador){
        localStorage.setItem("button",true)
    }
   
    const isuser = usuario.roles.map((r) => r.name).includes("user");

    const isUsuarioOAdministrador = isUsuario || isAdministrador || isuser;

    if (!isUsuarioOAdministrador) {
      return <Navigate to="/" />;
    }
  }

  return children ? children : <Outlet />;
}

export default ProctRoutes;

export const ProtectedRoutesAdmin = ({ children }) => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({});
  const [usuarioCargado, setUsuarioCargado] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecoded(token);
        const traerUsuario = async () => {
          const respuesta = await axios.get(`${URL}${decodedToken.id}`);
          setUsuario(respuesta.data);
          setUsuarioCargado(true);
        };
        if (!usuarioCargado) {
          traerUsuario();
        }
      } catch (error) {
        navigate("/");
      }
    }
  }, []);

  if (!token) {
    return  <Navigate to={"/"}/>
  }

  if (usuarioCargado) {
    const isAdministrador = usuario.roles.map((rol) => rol.name)
      .includes("admin");
    if (!isAdministrador) {
      return <Navigate to={"/"}/>
    }else{
        return children ? children : <Outlet />;
    }
  }

  
};
