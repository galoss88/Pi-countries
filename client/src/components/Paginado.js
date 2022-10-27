import React from "react";
import paginadoStyle from "../styles/Paginado.module.css"

export default function Paginado({ countries, paginado }) {
  const pageNumber = [];
  for (let i = 0; i <= Math.ceil(countries / 10 - 1); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <React.Fragment>
      <nav>
        <ul >
          <li className={paginadoStyle.li}>
            {pageNumber &&
              pageNumber.map((number) => (
                <button className={`${paginadoStyle.seleccion} ${paginadoStyle.buttonPaginado}`} key={number} onClick={() => paginado(number)}>
                  {number}
                </button>
              ))}
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}
