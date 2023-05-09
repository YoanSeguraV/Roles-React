import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function User() {
  var buttn = localStorage.getItem("button");

  return (
    <div>
      <h1>User</h1>
      {buttn ? <Link to={"/admin"}>Ir dashboard</Link> : <p></p>}{" "}
    </div>
  );
}

export default User;
