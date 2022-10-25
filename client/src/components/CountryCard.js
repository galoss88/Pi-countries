import React from "react";
import styles from "../styles/CountryCard.module.css";
import { Link } from "react-router-dom";

export default function CountryCard(props) {
  return (
    <React.Fragment>
      <div className={styles.styleDiv}>
      <Link to={`/countries/${props.id}`} >
        <div className={styles.styleDiv2}>
          <ul>
            
              <h2 className={styles.tituloPais}>{props.name}</h2>
              <hr />
              <h2>{props.continent}</h2>
              <img
                className={styles.img}
                src={props.imagecountry}
                alt={`bandera pais {props.name}`}
              />
            
          </ul>
        </div>
        </Link>
      </div>
    </React.Fragment>
  );
}
