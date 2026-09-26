const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    createCategory,
    getCategories
} = require("../controllers/categoryController");

const validate = require("../middleware/validation");

const { createCategorySchema } = require("../middleware/categoryValidation");

const router = express.Router();

// Create category - STAFF or ADMIN
router.post(
    "/",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(createCategorySchema),
    createCategory
);

// Get categories - Public
router.get("/", getCategories);

module.exports = router;