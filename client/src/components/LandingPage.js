import React from "react";
import styleLanding from "../styles/LandingPage.module.css"
import { NavLink } from "react-router-dom";
export default function LandingPage() {
  return (
   
      <div className={styleLanding.divGeneral}>

      
      <h1>Bienvenidos</h1>
      <NavLink to="/home">
        <button className={styleLanding.buttonHome}>Home</button>
      </NavLink>
      </div>
  
    
  );
}
