import React from "react";
import paginadoStyle from "../styles/Paginado.module.css";

export default function Paginado({ countries, paginado, countriesPerPage }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(countries / 10); i++) {
    pageNumber.push(i);
  }
  //[1,2,3...25]

  return (
    <React.Fragment>
      <nav>
        <ul>
          <li className={paginadoStyle.li}>
            {pageNumber &&
              pageNumber.map((number) => (
                <button
                  className={`${paginadoStyle.seleccion} ${paginadoStyle.buttonPaginado}`}
                  key={number}
                  onClick={() => paginado(number)}
                >
                  {number}
                </button>
              ))}
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}
