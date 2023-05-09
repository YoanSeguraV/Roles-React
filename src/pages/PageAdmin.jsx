import React from "react";
import { Link } from "react-router-dom";

function PageAdmin() {
  const buttn =localStorage.getItem("button")
  return (
  <div>
    <h1>MODERADOR</h1>
  
  <div>{ buttn ? <Link to={"/admin"}>Ir dashboard</Link>: ""} </div>
    </div>
  )
}

export default PageAdmin;
