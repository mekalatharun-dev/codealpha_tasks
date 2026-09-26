const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    createTable,
    getTables,
    getTableById,
    updateTable
} = require("../controllers/tableController");

const validate = require("../middleware/validation");

const {
    createTableSchema,
    updateTableSchema
} = require("../middleware/tableValidation");

const router = express.Router();

// Create table - STAFF or ADMIN
router.post(
    "/",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(createTableSchema),
    createTable
);

// Get all tables - Public
router.get("/", getTables);

// Get table by ID - Public
router.get("/:id", getTableById);

// Update table - STAFF or ADMIN
router.put(
    "/:id",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(updateTableSchema),
    updateTable
);

module.exports = router;