const prisma = require("../utils/prisma");

// Add ingredient to a menu item
const addIngredientToMenuItem = async (req, res) => {
    try {
        const { menuItemId, inventoryItemId, quantityRequired } = req.body;

        if (!menuItemId || !inventoryItemId || quantityRequired === undefined) {
            return res.status(400).json({
                message: "menuItemId, inventoryItemId and quantityRequired are required"
            });
        }

        const menuItem = await prisma.menuItem.findUnique({
            where: {
                id: Number(menuItemId)
            }
        });

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        const inventoryItem = await prisma.inventoryItem.findUnique({
            where: {
                id: Number(inventoryItemId)
            }
        });

        if (!inventoryItem) {
            return res.status(404).json({
                message: "Inventory item not found"
            });
        }

        const ingredient = await prisma.menuItemIngredient.create({
            data: {
                menuItemId: Number(menuItemId),
                inventoryItemId: Number(inventoryItemId),
                quantityRequired: Number(quantityRequired)
            }
        });

        res.status(201).json({
            message: "Ingredient added to menu item successfully",
            ingredient
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to add ingredient to menu item"
        });
    }
};

// Get ingredients for a menu item
const getMenuItemIngredients = async (req, res) => {
    try {
        const menuItemId = Number(req.params.menuItemId);

        const ingredients = await prisma.menuItemIngredient.findMany({
            where: {
                menuItemId
            },
            include: {
                inventoryItem: true
            }
        });

        res.status(200).json(ingredients);
    } catch (error) {
        console.error(error);

        res.status(500).json({
    message: "Failed to add ingredient to menu item",
    error: error.message
});
    }
};

module.exports = {
    addIngredientToMenuItem,
    getMenuItemIngredients
};