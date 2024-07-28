const express = require('express');
const multer = require("multer");

const { requireAuth } = require("../middlewares/authMiddleware");
const userController = require('../controllers/userController');
const fileStorage = require("../utils/storage");

const router = express.Router();

router
  .get('/profile', requireAuth, userController.getUserProfile)
  .put('/profile', requireAuth, multer({ storage: fileStorage.userAvatarStorage }).single('avatar'), userController.updateUserProfile)
  .get('/social_link', requireAuth, userController.getUserSocialLink)
  .put('/social_link', requireAuth, userController.updateUserSocailLink)
  .put('/password', requireAuth, userController.updatePassword)

  .post('/bookmarked/:serviceId', requireAuth, userController.createBookmarkedService)
  .put('/bookmarked/:serviceId', requireAuth, userController.updateViewStatusBookmarkedService)
  .delete('/bookmarked/:serviceId', requireAuth, userController.removeBookmarkedService)

module.exports = router;
