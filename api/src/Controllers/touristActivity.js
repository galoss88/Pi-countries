const { TouristActivity, Country } = require("../db.js");
const getTouristActivity = async (req, res) => {
  try {
    let { name, difficulty, duration, season, countries } = req.body;
    let [activity, created] = await TouristActivity.findOrCreate({
      where: { name, difficulty, duration, season },
      defaults: { name, difficulty, duration, season },
    });
    if (countries) {
      let countriesDb = await Country.findAll({
        where: { name: countries },
      });
      activity.addCountry(countriesDb);

      return created === false
        ? res
            .status(200)
            .json(
              "La actividad ya existe y fue asociada al pais correspondiente!"
            )
        : res
            .status(200)
            .json("Actividad creada y asociada al pais correspondiente!");
    }

    res.status(200).json("Actividad creada sin asociarse a ningun pais");
  } catch (e) {
    res.status(400).json(e);
  }
};

const getActivity = async (req, res, next) => {
  try {
    const activities = await TouristActivity.findAll({
      include: Country,
    });
    console.log("activities db", activities);
    return res.json(activities);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getTouristActivity, getActivity };
