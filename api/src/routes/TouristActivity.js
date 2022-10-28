const {Router} = require("express");
const router = Router();
const{postTouristActivity, getActivity} = require("../Controllers/touristActivity.js")

router.post("/", postTouristActivity);
router.get("/", getActivity)

module.exports = router;