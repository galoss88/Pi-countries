import React from "react";

export default function Paginado({ countries, paginado }) {
  const pageNumber = [];
  for (let i = 0; i <= Math.ceil(countries / 10 - 1); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <React.Fragment>
      <nav>
        <ul className="paginado">
          <li>
            {pageNumber &&
              pageNumber.map((number) => (
                <button key={number} onClick={() => paginado(number)}>
                  {number}
                </button>
              ))}
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}