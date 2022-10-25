import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCountries, postTouristActivity } from "../Redux/actions";
import creation from "../styles/CreationActivity.module.css";

export default function CreationActivity(props) {
  const history = useHistory()
  
  //Traer INFORMACION
  const dispatch = useDispatch();
  const countrys = useSelector((state) => state.countries);
  useEffect(() => dispatch(getCountries()), []);

  //Estados locales
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });
  //ERRORES
  const [error, setError] = useState([{errorName: "", errorDifficulty:"", errorDuration:"", sinError:true,}]);

  function handleChangeSelect(e) {
    //opcion 1
    let options = Array.from(e.target.selectedOptions).map((e) => e.value);

    setInput({ ...input, countries: options });
  }
  // valite que funciona
  // function validate(value) {
  //   let validar = /^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/;
  //   if (validar.test(value.trim())) {
  //     setInput({ ...input, name: value });
  //     setError("");
  //   } else {
  //     setError("No se permite simbolos ni numeros");
  //   }
  // }

  function validate(e) {
    if (!error.filter((e) => e.sinError === true).length) {
      setError([{errorName: "", errorDifficulty:"", errorDuration:"", sinError:true,}]);
    }
    
    //Validar nombre actividad
    if (e.target.name === "name") {
      let validar = /^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/;
      if (!validar.test(e.target.value)) {
        setError([{...error[0], errorName: "No se admite numeros ni simbolos", sinError:false }]);
      } else {
        setError([{...error[0], errorName: "", sinError:true }]);
      }
    }
    //Validar dificultad   COLOCAR ARRAY EN ERRORES

    if (e.target.name === "difficulty") {
      
      e.target.value < 1 || e.target.value > 5
        ? setError([{...error[0],  errorDifficulty: "Solo valores entre 1 y 5", sinError:false }])
        : setError([{...error[0], errorDifficulty: "", sinError:true }]);
    }
    //validar DURATION
    if (e.target.name === "duration") {
      e.target.value == 0 || e.target.value > 48
        ? setError([{
            ...error[0],
             errorDuration: "Solo se admite valores entre 1 y 48", sinError:false }
          ])
        : setError([{...error[0],  errorDuration: "", sinError:true }]);
    }
  }

  function handleChange(e) {
    validate(e);

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postTouristActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "default",
      countries: [],
    })
  }

  return (
    <div className={creation.div}>
      <div className={creation.formulario}>
      {/* <a href="javascript: history.go(-1)"><button>Volver atras</button></a> */}
      <button onClick={history.goBack}>Atras</button>

        <form onSubmit={(e) => handleSubmit(e)}>
          <label className={creation.textos}>Nombre de actividad: </label>
          <br />

          <input
            className={!error[0]?.errorName ? null : creation.error}
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          ></input>
          {error[0]?.errorName ? <p>{error[0].errorName}</p> : null}
          <br />

          <label className={creation.textos}>Dificultad</label>
          <br />
          <input
            className={error[0]?.errorDifficulty ? creation.error : null}
            type="number"
            name="difficulty"
            placeholder="1-5"
            value={input.difficulty}
            min="1"
            max="5"
            onChange={(e) => handleChange(e)}
          ></input>
          {error[0]?.errorDifficulty ? (
            <p>Solo se admite valores de 1 a 5</p>
          ) : (
            <br />
          )}

          <label className={creation.textos}>Duracion(hs)</label>
          <br />
          <input
            className={error[0]?.errorDuration ? creation.error : null}
            type="number"
            name="duration"
            placeholder="1-48hs"
            value={input.duration}
            min="1"
            max="48"
            onChange={(e) => handleChange(e)}
          ></input>
          {error[0]?.errorDuration ? (
            <p>Solo se admite valores de 1 a 48</p>
          ) : (
            <br />
          )}

          <label className={creation.textos}>Temporada</label>
          <br />
          <select name="season" value={input.season} onChange={(e) => handleChange(e)}>
            <option disabled selected value="default">
              Seleccione Temporada
            </option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
          </select>
          <br />
          <label className={creation.textos}>
            Seleccione un pais (OPCIONAL)
          </label>
          <p>
            Recuerde que para elegir mas de 1 pais debe apretar control izq y
            seleccionar sus paises
          </p>

          <select
            id="form"
            multiple
            name="countries[]"
            size="7"
            onChange={(e) => handleChangeSelect(e)}
          >
            <option disabled selected value="default">
              Seleccione Pais
            </option>
            {countrys.map((c) => {
              return (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          {error[0].sinError === true ? (
            <input
              className={creation.enviar}
              type="submit"
              value="Crear"
            ></input>
          ) : null}
        </form>
      </div>
    </div>
  );
}
