import React from "react";
import styles from "../styles/CountryCard.module.css";
import { Link } from "react-router-dom";

export default function CountryCard(props) {
  return (
    <React.Fragment>
      <div className={styles.styleDiv2}>
        <Link className={styles.tituloPais} to={`/countries/${props.id}`}>
        
            <h1 className={styles.tituloPais}>{props.name}</h1>
            <hr />
            <h2>{props.continent}</h2>
            <img
              className={styles.img}
              src={props.imagecountry}
              alt={`bandera pais ${props.name}`}
            />
          
        </Link>
      </div>
    </React.Fragment>
  );
}
