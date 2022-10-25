import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const ORDER_COUNTRIES_ASC = "ORDER_COUNTRIES_ASC";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const ORDER_FOR_CONTINENT = "ORDER_FOR_CONTINENT";
export const GET_TOURIST_ACTIVITY = "GET_TOURIST_ACTIVITY";
export const ORDER_FOR_TOURIST_ACTIVITY = "ORDER_FOR_TOURIST_ACTIVITY";
export const POST_TOURIST_ACTIVITY = "POST_TOURIST_ACTIVITY";
export const ORDER_FOR_POPULATION = "ORDER_FOR_POPULATION";
export const GET_DETAILS = "GET_DETAILS";


export function getCountries() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}


export function getTouristActivity() {
  return async (dispatch) => {
    let activities = await axios.get("http://localhost:3001/activities");
    return dispatch({ type: GET_TOURIST_ACTIVITY, payload: activities.data });
  };
}

export function postTouristActivity(payload) {
  console.log('payload',payload)
  try{
    return async (dispatch) => {
      let json = await axios.post("http://localhost:3001/activities", payload);
      dispatch({
        type:POST_TOURIST_ACTIVITY,
        payload: json
      })
    };
    
  // eslint-disable-next-line no-unreachable
  }catch(e){
    console.log("Fallo post activity")
  }
  
}

export function orderCountriesAsc(payload) {
  return {
    type: ORDER_COUNTRIES_ASC,
    payload,
  };
}

export function searchCountry(payload) {

  return {
    type: SEARCH_COUNTRY,
    payload,
  };
}

export function orderForContinent(payload) {
  return {
    type: ORDER_FOR_CONTINENT,
    payload,
  };
}

export function orderForTouristActivity(payload) {
  return {
    type: ORDER_FOR_TOURIST_ACTIVITY,
    payload,
  };
}

export function orderForPopulation(payload) {
  return {
    type: ORDER_FOR_POPULATION,
    payload,
  };
}

export const getDetails = (id) => async (dispatch) => {
  try {
      const json = await axios.get(`http://localhost:3001/countries/${id}`); 
      console.log('detalles',json.data)
      return dispatch({
          type: GET_DETAILS,
          payload: json.data
      })
  } catch (error) {
      console.log('El getCountryDetail fallo')
  }
}


export const cleanCountryDetail = () => {
  return {
      type: 'CLEAN_COUNTRY_DETAILS',
  }
}
