import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getCountries,
  getTouristActivity,
  orderCountriesAsc,
  orderForContinent,
  orderForPopulation,
  orderForTouristActivity,
  searchCountry,
} from "../Redux/actions";
import CountryCard from "./CountryCard";
import Paginado from "./Paginado";
import Search from "./Search";

function Home(props) {
 
  //CARGAR INFORMACION----------------------------
  const dispatch = useDispatch();

  useEffect(() => {
    props.getCountries();
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getTouristActivity());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //---------------------------------------------

  function handleClick(e) {
    e.preventDefault();
    props.getCountries();
  }
 

  //PÁGINADO---------------------------------
  const [actualPage, setActualPage] = useState(1);
  let countriesPerPage;
  actualPage === 1 ? (countriesPerPage = 9) : (countriesPerPage = 10);
  let indexOfFirstCountry;
  let indexOfLastCountry = actualPage * countriesPerPage; //9 //20 //30

  if (actualPage === 2) {
    indexOfFirstCountry = indexOfLastCountry - 1 - countriesPerPage;
    indexOfLastCountry = indexOfLastCountry - 1;
  } else {
    if (actualPage !== 2) {
      indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    }
  }

  const countriesActuales = props.countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginado = (pageNumber) => {
    setActualPage(pageNumber);
  };
  //--------------------------------------------------
  //BUSQUEDA

  //----------------------------------------------------------

  //Filtrado
  //Filtrar paises por orden alfabetico.
  // eslint-disable-next-line no-unused-vars
  const [orderAz, setOrderAz] = useState("");
  function functionFilterAsc(e) {
    e.preventDefault();
    props.orderAsc(e.target.value);
    // setActualPage(1);
    setOrderAz(e.target.value);
  }
  //Filtrar por continente
  // eslint-disable-next-line no-unused-vars
  const [continent, setContinent] = useState("");
  function handleFilterContinent(e) {
    props.orderContinent(e.target.value);
    setContinent(e.target.value);
  }

  //Filtrar actividad turisticas
  // eslint-disable-next-line no-unused-vars
  const [activities, setActivities] = useState("");
  function handleFilterActivities(e) {
    dispatch(orderForTouristActivity(e.target.value));
    setActivities(e.target.value);
  }

  const touristActivities = useSelector((state) => state.touristActivities);

  //filtrar por Poblacion(POPULATION0)
  const [orderPopulation, setOrderPopulation] = useState("");
  const handlePopulation = (e) => {
    dispatch(orderForPopulation(e.target.value));
    setOrderPopulation(e.target.value);
  };

  return (
    <React.Fragment>
      
     	
       <button onClick={props.history.goBack}>Atras</button>
      <Search
        getCountries={props.getCountries}
        searchCountries={props.searchCountries}
        setActualPage={setActualPage}
      ></Search>
      <NavLink to={"/createActivity"}>
        <input type="button" value="Crear Actividad Turistica"></input>
      </NavLink>

      <button onClick={(e) => handleClick(e)}>Recargar Paises</button>
      <select onChange={(e) => handleFilterActivities(e)}>
        <option value="default" hidden>
          Actividad turistica
        </option>
        <option value="All">All</option>
        {touristActivities?.map((e) => (
          <option value={e.name}>{e.name}</option>
        ))}
      </select>
      <select onChange={(e) => handleFilterContinent(e)}>
        <option value={"default"} hidden>
          Continent
        </option>
        
        <option value="All">All</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Oceania">Oceania</option>
        <option value="Africa">Africa</option>
        <option value="Antarctica">Antarctica</option>
      </select>
      <select onChange={(e) => functionFilterAsc(e)}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select onChange={(e) => handlePopulation(e)}>
        <option value="default" hidden>
          Poblacion
        </option>
        <option value="popuAsc">Ordenar Ascendentemente</option>
        <option value="popuDesc">Ordenar Descendentemente</option>
      </select>
      <Paginado
        countriesPerPage={countriesPerPage}
        paginado={paginado}
        countries={props.countries.length}
      />

      {/* botones PAGINADO siguiente y atras */}
      {/* <button onClick={() => nextPage()}>Siguiente</button>
      <button onClick={() => prevPage()}>Atras</button> */}
      <div>
        {countriesActuales &&
          countriesActuales.map((e) => (
            <div key={e.id}>
              <CountryCard
                id={e.id}
                name={e.name}
                imagecountry={e.imagecountry}
                continent={e.continent}
              />
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}
function mapStateToProps(state) {
  return {
    countries: state.countries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCountries: () => dispatch(getCountries()),
    orderAsc: (value) => dispatch(orderCountriesAsc(value)),
    searchCountries: (payload) => dispatch(searchCountry(payload)),
    orderContinent: (value) => dispatch(orderForContinent(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
