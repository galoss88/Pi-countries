//IMPORTACIONES
const { Router } = require("express");
const router = Router();
const  getCountries  = require("../Controllers/countries.js");
//RUTAS
router.get("/", getCountries);
router.get("/:id", getCountries);


module.exports=router;
