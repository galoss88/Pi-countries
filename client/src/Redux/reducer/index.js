import {
  GET_COUNTRIES,
  ORDER_COUNTRIES_ASC,
  ORDER_FOR_CONTINENT,
  SEARCH_COUNTRY,
  GET_TOURIST_ACTIVITY,
  ORDER_FOR_TOURIST_ACTIVITY,
  ORDER_FOR_POPULATION,
  GET_DETAILS,
  POST_TOURIST_ACTIVITY,
  CLEAN_COUNTRY_DETAILS,
} from "../actions";

const initialState = {
  countries: [],
  allCountries: [],
  touristActivities: [],
  detailCountry: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    }
    case GET_TOURIST_ACTIVITY: {
      return {
        ...state,
        touristActivities: action.payload,
      };
    }
    case POST_TOURIST_ACTIVITY: {
      return {
        ...state,
      };
    }
    case SEARCH_COUNTRY: {
      let searchCountry = state.allCountries.filter((e) =>
        e.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      if (!searchCountry.length) {
        return alert("No se encontro el pais correspondiente");
      } else {
        return {
          ...state,
          countries: searchCountry,
        };
      }
    }
    case ORDER_COUNTRIES_ASC: {
      let ordenAscOrDesc;
      if (action.payload === "asc") {
        ordenAscOrDesc = state.countries.sort((a, b) => {
          let nombreA = a.name.toLowerCase();
          let nombreB = b.name.toLowerCase();

          if (nombreA < nombreB) {
            return -1;
          }
          if (nombreA > nombreB) {
            return 1;
          }
          return 0;
        });
      } else {
        ordenAscOrDesc = state.countries.sort((a, b) => {
          let nombreA = a.name.toLowerCase();
          let nombreB = b.name.toLowerCase();

          if (nombreA > nombreB) {
            return -1;
          }
          if (nombreA < nombreB) {
            return 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        countries: ordenAscOrDesc,
      };
    }

    case ORDER_FOR_CONTINENT: {
      const allCountries = state.allCountries;
      let orderContinent =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((c) => {
              return c.continent === action.payload;
            });

      return {
        ...state,
        countries: orderContinent,
      };
    }

    case ORDER_FOR_TOURIST_ACTIVITY: {
      let witchActivity = [];
      state.allCountries.filter((country) =>
        country.TouristActivities.forEach((t) => {
          if (t.name === action.payload) witchActivity.push(country);
        })
      );

      return {
        ...state,
        countries: witchActivity,
      };
    }
    case ORDER_FOR_POPULATION: {
      let orderPopulation;
      if (action.payload === "popuAsc") {
        orderPopulation = state.countries.sort((a, b) => {
          if (a.population > b.population) {
            return 1;
          }
          if (a.population < b.population) {
            return -1;
          }
          return 0;
        });
      } else {
        orderPopulation = state.countries.sort((a, b) => {
          if (a.population > b.population) {
            return -1;
          }
          if (a.population < b.population) {
            return 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        countries: orderPopulation,
      };
    }

    case GET_DETAILS:
      return { ...state, detailCountry: action.payload };

    case CLEAN_COUNTRY_DETAILS:
      return {
        ...state,
        detailCountry: [],
      };

    default:
      return state;
  }
}
