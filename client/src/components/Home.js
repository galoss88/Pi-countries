import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//IMPORT ESTILO
import homeStyle from "../styles/Home.module.css";
//IMPORT DE ACTIONS
import {
  getCountries,
  getTouristActivity,
  orderCountriesAsc,
  orderForContinent,
  orderForPopulation,
  orderForTouristActivity,
  searchCountry,
} from "../Redux/actions";

//IMPORT DE COMPONENTES
import CountryCard from "./CountryCard";
import Paginado from "./Paginado";
import Search from "./Search";

function Home(props) {
  //CARGAR INFORMACION DE LOS PAISES Y ACTIVIDADES TURISTICAS----------------------------
  const dispatch = useDispatch();

  useEffect(() => {
    props.getCountries();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getTouristActivity());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //---------------------------------------------
  //FUNCION RECARGAR PAISES
  function handleClick(e) {
    e.preventDefault();
    setActivities("default");
    setContinent("default");
    setOrderAz("default");
    setOrderPopulation("default");
    paginado(1);
    props.getCountries();
  }

  //PÁGINADO----------------------------------------------- >>
  const [actualPage, setActualPage] = useState(1);
  let countriesPerPage;
  actualPage === 1 ? (countriesPerPage = 9) : (countriesPerPage = 10);

  let indexOfLastCountry = actualPage * countriesPerPage; //9 //20 //30
  let indexOfFirstCountry;

  if (actualPage > 1) {
    indexOfFirstCountry = indexOfLastCountry - 1 - countriesPerPage;
    indexOfLastCountry = indexOfLastCountry - 1;
  } else {
    if (actualPage === 1) {
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
  //-------------------------------------------------- //

  //Filtrado------------------->>
  //Filtrar paises por orden alfabetico.-------------------------------->>
  // eslint-disable-next-line no-unused-vars
  const [orderAz, setOrderAz] = useState("");
  function functionFilterAsc(e) {
    e.preventDefault();
    props.orderAsc(e.target.value);
    // setActualPage(1);
    setOrderAz(e.target.value);
  }
  //Filtrar por continente---------------------------------------->>
  // eslint-disable-next-line no-unused-vars
  const [continent, setContinent] = useState("");
  function handleFilterContinent(e) {
    props.orderContinent(e.target.value);
    paginado(1);
    setContinent(e.target.value);
  }

  //Filtrar actividad turisticas------------------------------->>
  // eslint-disable-next-line no-unused-vars
  const [activities, setActivities] = useState("default");
  function handleFilterActivities(e) {
    dispatch(orderForTouristActivity(e.target.value));
    paginado(1);
    setActivities(e.target.value);
  }

  const touristActivities = useSelector((state) => state.touristActivities);

  //filtrar por Poblacion(POPULATION0)------------------------
  // eslint-disable-next-line no-unused-vars
  const [orderPopulation, setOrderPopulation] = useState("");
  const handlePopulation = (e) => {
    dispatch(orderForPopulation(e.target.value));
    setOrderPopulation(e.target.value);
  };

  return (
    <React.Fragment>
      <div className={homeStyle.divGeneral}>
        <div>
          {/* BOTON ATRAS---------------------------------------->> */}
          <button
            onClick={props.history.goBack}
            className={homeStyle.seleccion}
          >
            Atras
          </button>
          {/*COMPONENTE DE BOTON BUSQUEDA----------------------------------->> */}
          <Search
            getCountries={props.getCountries}
            searchCountries={props.searchCountries}
          ></Search>

          {/*//BOTON RECARGAR PAISES------------------------------->>  */}
          <button
            className={homeStyle.seleccion}
            onClick={(e) => handleClick(e)}
          >
            Recargar Paises
          </button>
          {/*//FILTROS:--- 
      //FILTRO POR ACTIVIDAD TURISTICA------------------------->>*/}
          <select
            className={homeStyle.seleccion}
            value={activities}
            onChange={(e) => handleFilterActivities(e)}
          >
            <option value="default" hidden>
              Actividad turistica
            </option>

            {touristActivities?.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>
          {/*//FILTRO POR CONTINENTE ---------------------------->>*/}
          <select
            className={homeStyle.seleccion}
            value={continent}
            onChange={(e) => handleFilterContinent(e)}
          >
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
          {/*//FILTRO ORDEN ALFABETICO ASCENDENTE Y DESCENDENTE------------>>      */}
          <select
            className={homeStyle.seleccion}
            value={orderAz}
            onChange={(e) => functionFilterAsc(e)}
          >
            <option value="default" hidden>
              Orden alfabetico
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          {/*//FILTRO POR POBLACION-------------------->> */}
          <select
            className={homeStyle.seleccion}
            value={orderPopulation}
            onChange={(e) => handlePopulation(e)}
          >
            <option value="default" hidden>
              Ordenar por numero de poblacion
            </option>
            <option value="popuAsc">Ordenar Ascendentemente poblacion</option>
            <option value="popuDesc">Ordenar Descendentemente poblacion</option>
          </select>
          {/*//CREAR ACTIVIDAD--------------------------------->> */}
          <Link className={homeStyle.actividadTuristica} to={"/createActivity"}>
            <input
              className={homeStyle.actividadTuristica}
              type="button"
              value="Crear Actividad Turistica"
            ></input>
          </Link>

          {/*//PAGINADO ------------------------------------->> */}
          <Paginado
            countriesPerPage={countriesPerPage}
            paginado={paginado}
            countries={props.countries.length}
          />
        </div>

        {/* RENDER CARD PAISES --------------------------------------->> */}
        <div className={homeStyle.divCountries}>
          {countriesActuales &&
            countriesActuales.map((e) => (
              <CountryCard
                key={e.id}
                id={e.id}
                name={e.name}
                imagecountry={e.imagecountry}
                continent={e.continent}
              />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}

//CONNECT------------------------------
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
