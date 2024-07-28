const express = require('express');
const multer = require("multer");

const { requireAuth } = require("../middlewares/authMiddleware");
const allServiceController = require("../controllers/allServiceController");
const fileStorage = require("../utils/storage");
const fileClassifyMiddlware = require("../middlewares/fileClassifyMiddleware");

const router = express.Router();

router
  .get('/basic', allServiceController.getServicesBySearchType)
  .get('/all', allServiceController.getAllServicesList)
  .get('/detail/:serviceId', allServiceController.getServiceDetailInfo)

module.exports = router;
