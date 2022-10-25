import React from "react";
import { NavLink } from "react-router-dom";
export default function LandingPage() {
  return (
    <React.Fragment>
      <h1>Bienvenidos</h1>
      <NavLink to="/home">
        <button>Hacia home</button>
      </NavLink>

  
    </React.Fragment>
  );
}
