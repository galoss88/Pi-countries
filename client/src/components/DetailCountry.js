import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { cleanCountryDetail, getDetails } from "../Redux/actions";
import styleDetail from "../styles/DetailCountry.module.css";

export default function DetailCountry(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const { id } = useParams();

  const detailCountrys = useSelector((state) => state.detailCountry);

  useEffect(() => {
    console.log(id);
    dispatch(getDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    return () => {
      dispatch(cleanCountryDetail());
    };
  }, [dispatch]);

  function convertirNumeroMiles(numero) {
    let numberToString = numero.toString();
    let arrayNumber = numberToString.split("").reverse();
    let newNumber = "";
    for (let i = 0; i < arrayNumber.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        newNumber = "." + newNumber;
      }
      newNumber = arrayNumber[i] + newNumber;
    }
    return newNumber;
  }

  return (
    <div className={styleDetail.general}>
      {detailCountrys?.map((c) => {
        return (
          <div className={styleDetail.div}>
            <img
              className={styleDetail.img}
              src={c.imagecountry}
              alt="imageCountry"
            />
            <h1>{c.name}</h1>
            <h2>Id: {c.id}</h2>
            <h2>Capital: <span>{c.capital}</span> </h2>
            <h2>SubRegion: {c.subregion}</h2>
            <h2>
              Area: {convertirNumeroMiles(c.area)}km<sup>2</sup>
            </h2>
            <h2>Poblacion: {convertirNumeroMiles(c.population)}</h2>
            
              <h1>Actividades turisticas:</h1>
              {c.TouristActivities.map((a) => {
                return (
                  <div className={styleDetail.texto}>
                    <h2>Actividad: {a.name}</h2>
                    <h3>Dificultad: {a.difficulty}</h3>
                    <h3>Duración: {a.duration}</h3>
                    <h3>Temporada: {a.season}</h3>
                  </div>
                );
              })}
            
            <button className={styleDetail.buttonAtras} onClick={history.goBack}>Atras</button>
          </div>
        );
      })}
    </div>
  );
}
