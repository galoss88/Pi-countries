import React, { useState } from "react";
import searchStyle from "../styles/Search.module.css";
export default function Search(props) {
  const [search, setSearch] = useState("");
  function Search(e) {
    setSearch(e.target.value);
  }
  function HandleSearch(e) {
    e.preventDefault();
    !search ? alert("Busqueda vacia") : props.searchCountries(search);
    props.setActualPage(1);
    setSearch("");
  }

  return (
    <React.Fragment>
      <input
      className={searchStyle.buscador}
        type="search"
        value={search}
        placeholder="search"
        onChange={(e) => Search(e)}
      />
      <input
        className={searchStyle.seleccion}
        type="submit"
        value="Search"
        onClick={(e) => HandleSearch(e)}
      />
    </React.Fragment>
  );
}
