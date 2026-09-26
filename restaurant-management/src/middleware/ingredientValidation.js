const { z } = require("zod");

const addIngredientSchema = z.object({
    menuItemId: z.coerce.number().int().positive(),
    inventoryItemId: z.coerce.number().int().positive(),
    quantityRequired: z.coerce.number().positive(
        "Quantity required must be greater than 0"
    )
});

module.exports = {
    addIngredientSchema
};