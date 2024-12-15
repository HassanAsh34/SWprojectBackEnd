const express = require("express");
const authController = require("../controllers/authenication");
const redis = require("../middlewares/redis")
const router = express.Router();

// router.post("/listEmailINfolder", authController.AuthToken, redis.checkBlacklist,);