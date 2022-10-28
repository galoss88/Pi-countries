import React, { useState } from "react";
import searchStyle from "../styles/Search.module.css";
export default function Search(props) {
  const [search, setSearch] = useState("");
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  function HandleSubmitSearch(e) {
    e.preventDefault();    
    !search ? alert("Busqueda vacia") : props.searchCountries(search);
    setSearch("");
  }

  return (
    <React.Fragment>
      <input
        className={searchStyle.buscador}
        type="search"
        value={search}
        placeholder="search"
        onChange={(e) => handleSearch(e)}
      />
      <input
        className={searchStyle.seleccion}
        type="submit"
        value="Search"
        onClick={(e) => HandleSubmitSearch(e)}
      />
    </React.Fragment>
  );
}
