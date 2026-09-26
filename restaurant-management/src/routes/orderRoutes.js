const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
} = require("../controllers/orderController");

const validate = require("../middleware/validation");

const {
    createOrderSchema,
    updateOrderStatusSchema
} = require("../middleware/orderValidation");

const router = express.Router();

// Create order - STAFF or ADMIN
router.post(
    "/",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(createOrderSchema),
    createOrder
);

// Get all orders - STAFF or ADMIN
router.get(
    "/",
    authenticate,
    authorize("STAFF", "ADMIN"),
    getOrders
);

// Get order by ID - STAFF or ADMIN
router.get(
    "/:id",
    authenticate,
    authorize("STAFF", "ADMIN"),
    getOrderById
);
// Update order status - STAFF or ADMIN
router.put(
    "/:id/status",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(updateOrderStatusSchema),
    updateOrderStatus
);

module.exports = router;