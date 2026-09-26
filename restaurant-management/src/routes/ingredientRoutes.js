const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    addIngredientToMenuItem,
    getMenuItemIngredients
} = require("../controllers/ingredientController");

const validate = require("../middleware/validation");

const {
    addIngredientSchema
} = require("../middleware/ingredientValidation");

const router = express.Router();

// Add ingredient - STAFF or ADMIN
router.post(
    "/",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(addIngredientSchema),
    addIngredientToMenuItem
);

// View ingredients - Public
router.get(
    "/menu/:menuItemId",
    getMenuItemIngredients
);

module.exports = router;