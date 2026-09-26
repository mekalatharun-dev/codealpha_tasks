const { z } = require("zod");

const createInventorySchema = z.object({
    name: z.string().min(2, "Inventory name must be at least 2 characters"),
    quantity: z.coerce.number().nonnegative("Quantity cannot be negative"),
    unit: z.string().min(1, "Unit is required"),
    minStock: z.coerce.number().nonnegative().optional()
});

const updateInventorySchema = z.object({
    name: z.string().min(2).optional(),
    quantity: z.coerce.number().nonnegative().optional(),
    unit: z.string().min(1).optional(),
    minStock: z.coerce.number().nonnegative().optional()
});

module.exports = {
    createInventorySchema,
    updateInventorySchema
};