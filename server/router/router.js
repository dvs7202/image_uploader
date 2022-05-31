const router = require("express").Router();
const controller = require("../controller/controller");
const store = require("../middleware/multer");
//routes
router.get("/", controller.home);
router.post("/uploadmultiple", store.array("images", 12), controller.uploads);

module.exports = router;
