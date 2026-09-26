const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    createInventoryItem,
    getInventoryItems,
    getInventoryItemById,
    updateInventoryItem
} = require("../controllers/inventoryController");

const validate = require("../middleware/validation");

const {
    createInventorySchema,
    updateInventorySchema
} = require("../middleware/inventoryValidation");

const router = express.Router();

// Create inventory item - STAFF or ADMIN
router.post(
    "/",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(createInventorySchema),
    createInventoryItem
);

// Get all inventory items - STAFF or ADMIN
router.get(
    "/",
    authenticate,
    authorize("STAFF", "ADMIN"),
    getInventoryItems
);

// Get inventory item by ID - STAFF or ADMIN
router.get(
    "/:id",
    authenticate,
    authorize("STAFF", "ADMIN"),
    getInventoryItemById
);

// Update inventory item - STAFF or ADMIN
router.put(
    "/:id",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(updateInventorySchema),
    updateInventoryItem
);

module.exports = router;