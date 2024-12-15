const folder = require("../controllers/folderController");
const authController = require("../controllers/authenication");
const redis = require("../middlewares/redis")
const email = require("../controllers/emailController")

const express = require("express");
const router = express.Router();

router.post("/folder/create",authController.AuthToken,redis.checkBlacklist,folder.createFolder);
router.post("/folder/:Fname/delete",authController.AuthToken,redis.checkBlacklist,folder.deleteFolder);
router.post("/folder/:Fname/rename",authController.AuthToken,redis.checkBlacklist,folder.renameFolder);
router.post("/folder/movetofolder/:Fname1/:emailId/:Fname2",authController.AuthToken,redis.checkBlacklist,folder.moveToFolder);
router.post("/folder/movetoSpam/:Fname1/:emailId/:Fname2",authController.AuthToken,redis.checkBlacklist,folder.moveToFolder);
router.post("/folder/moveToRecycleBin/:Fname1/:emailId/:Fname2",authController.AuthToken,redis.checkBlacklist,folder.moveToFolder);
router.post("/folder/moveToArchive/:Fname1/:emailId/:Fname2",authController.AuthToken,redis.checkBlacklist,folder.moveToFolder);
router.post("/folder/moveToDraft/:Fname1/:emailId/:Fname2",authController.AuthToken,redis.checkBlacklist,folder.moveToFolder);
// router.post("/folder/moveToSpam/:folderName/:emailId",authController.AuthToken,redis.checkBlacklist,folder.moveToSpam);
// router.post("/folder/moveToRecycle/:folderId/:emailId",authController.AuthToken,redis.checkBlacklist,folder.moveToRecycleBin);
router.post("/folder/RemoveFromRecycle/:emailId",authController.AuthToken,redis.checkBlacklist,folder.RecoverFromRecycleBin);
router.post("/folder/RecoverEmail/:emailId/:Fname",authController.AuthToken,redis.checkBlacklist,folder.RecoverEmail);
// router.post("/folder/search",authController.AuthToken,redis.checkBlacklist,folder.searchEmails);
router.get("/folder/:Fname",authController.AuthToken,redis.checkBlacklist,folder.getFolder,email.ListEmails)

module.exports = router;