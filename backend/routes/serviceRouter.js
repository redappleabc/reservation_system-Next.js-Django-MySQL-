const express = require('express');
const multer = require("multer");

const { requireAuth } = require("../middlewares/authMiddleware");
const serviceController = require("../controllers/serviceController");
const fileStorage = require("../utils/storage");
const fileClassifyMiddlware = require("../middlewares/fileClassifyMiddleware");

const router = express.Router();

router
  .get('/:userId', requireAuth, serviceController.getServiceList)
  .get('/:userId/:id', requireAuth, serviceController.getAService)
  .post('/main_data', requireAuth, serviceController.createServiceMainData)
  .post('/location', requireAuth, serviceController.createServiceLocation)
  .post('/category_tags', requireAuth, serviceController.createServiceCategoryAndTags)
  .post('/related_images_files', requireAuth, multer({ storage: fileStorage.imageAndFileStorageRelatedService }).fields([{ name: 'images', maxCount: 10 }, { name: 'files', maxCount: 10 }]), serviceController.createRelatedImagesAndFiles)
  .post('/detail_info', requireAuth, serviceController.createDetailInfo)
  .post('/option', requireAuth, serviceController.addServiceOption)
  .put('/option/:id', requireAuth, serviceController.updateServiceOption)
  .delete('/option/:id', requireAuth, serviceController.deleteServiceOption)

module.exports = router;
