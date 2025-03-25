const SellerAuthController = require('../controllers/SellerAuthController')
const { sellerAuthMiddleware } = require("../middlewares/authAggregrateMiddleware");
const SellerAuthService = require("../services/SellerAuthService");
const sellerAuthController = new SellerAuthController(SellerAuthService);

const router = require("express").Router();

router.post('/register', sellerAuthController.register.bind(sellerAuthController));
router.post('/login', sellerAuthController.login.bind(sellerAuthController));

module.exports = router;