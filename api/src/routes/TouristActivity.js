const {Router} = require("express");
const router = Router();
const{getTouristActivity, getActivity} = require("../Controllers/touristActivity.js")

router.post("/", getTouristActivity);
router.get("/", getActivity)

module.exports = router;