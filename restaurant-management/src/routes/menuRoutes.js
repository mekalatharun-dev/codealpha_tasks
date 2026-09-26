const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menuController");

const validate = require("../middleware/validation");

const {
    createMenuItemSchema,
    updateMenuItemSchema
} = require("../middleware/menuValidation");

const router = express.Router();

// Create menu item - STAFF or ADMIN
router.post(
    "/",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(createMenuItemSchema),
    createMenuItem
);

// Get all menu items - Public
router.get("/", getMenuItems);

// Get menu item by ID - Public
router.get("/:id", getMenuItemById);

// Update menu item - STAFF or ADMIN
router.put(
    "/:id",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(updateMenuItemSchema),
    updateMenuItem
);

// Delete menu item - ADMIN only
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deleteMenuItem
);

module.exports = router;