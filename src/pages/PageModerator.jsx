import React, { useEffect, useState } from "react";
import { getUser } from "../data/auth";
import { Link, useNavigate } from "react-router-dom";

function PageModerator() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const load = async () => {
      const response = await getUser(navigate);
      setdata(response);
    };
    load();
  }, []);
  return (
    <div>
      <h1 className="text-center">MODERADOR</h1>
      <Link to={"/user"}  className="mx-2">Ir Usuario</Link>
      <Link to={"/moderador"}  className="mx-2">Ir Moderador</Link>
      <div className="d-flex flex-wrap justify-content-center  ">
      {data.map(({ nombre, correo, contrasena, _id, roles }) => (
        <div key={_id} className="p-2">
          <div className="card" style={{ width: "18rem", height: "16rem" }}>
            <div className="card-body">
              <h3>{nombre}</h3>
              <p>{correo}</p>
              <p>{contrasena}</p>
              {roles.map((rol) => (
                <div className="d-inline-flex p-2" key={rol._id}>
                  <p
                    className={
                      rol.name === "admin"
                        ? "btn btn-danger"
                        : "btn btn-primary"
                    }
                  >
                    {rol.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default PageModerator;
