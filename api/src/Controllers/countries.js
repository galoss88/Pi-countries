const axios = require("axios");

const { Country, TouristActivity } = require("../db.js");
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const getCountries = async (req, res) => {
  try {
    //Compruebo si tengo info en base de datos.
    const countrieAll = await Country.findAll({
      include: {
        model: TouristActivity,
        attributes: ["id", "name", "difficulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    });

    //Traer paises por ID

    if (req.params.id) {
      let { id } = req.params;
      let countrieId = await Country.findByPk(id);
      return countrieId
        ? res.status(200).json(countrieAll.filter((e) => e.id === id))
        : res.status(400).json("No se encontro Pais");
    }

    //Traer paises por nombre -------------------

    if (req.query.name) {
      let { name } = req.query;
      let countryName = await countrieAll.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      return countryName
        ? res.status(200).json(countryName)
        : res.status(400).json("No Se encontro Pais");
    }

    //Traer todos los paises --------------------
    else {
      if (countrieAll.length === 0) {
        const apiUrl = await axios.get("https://restcountries.com/v3/all");
        const apiData = await apiUrl.data.map((e) => {
          return {
            id: e.cca3,
            name: removeAccents(e.translations.spa.common),
            imagecountry: e.flags[0],
            continent: e.continents[0],
            capital: e.capital ? e.capital[0] : "No tiene capital",
            subregion: e.subregion,
            area: e.area,
            population: e.population,
          };
        });

        await Country.bulkCreate(apiData);
      }
      return res.json(countrieAll);
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = getCountries;
