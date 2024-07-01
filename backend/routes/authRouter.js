const express = require("express");

const authController = require("../controllers/authController");
const { requireAuth, requireAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .post('/signup', authController.signup)
  .post('/login', authController.login)
  .get('/login_with_token', requireAuth, authController.loginWithToken)
  .get('/logout', requireAuth, authController.logout)

module.exports = router;
