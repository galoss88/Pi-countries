const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("TouristActivity", {
    name: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
    },
    duration: {
      type: DataTypes.STRING,
    },
    season: {
      type: DataTypes.ENUM("summer", "autumn", "winter", "spring"),
    },
  });
};
