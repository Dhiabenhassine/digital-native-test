const router=require("express").Router()
const { register, login, profile } = require("../Controller/userController");
const {validateToken}=require("../utils/JWT")


router.post("/register", register);
router.post("/login", login);
router.get("/profile/:userId",validateToken,profile)

module.exports = router;
