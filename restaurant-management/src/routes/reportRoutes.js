const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    getLowStockItems,
    getDailySales
} = require("../controllers/reportController");

const router = express.Router();

// Low stock report - ADMIN only
router.get(
    "/low-stock",
    authenticate,
    authorize("ADMIN"),
    getLowStockItems
);

// Daily sales report - ADMIN only
router.get(
    "/daily-sales",
    authenticate,
    authorize("ADMIN"),
    getDailySales
);

module.exports = router;