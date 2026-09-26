const { z } = require("zod");

const createMenuItemSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    price: z.coerce.number().positive("Price must be greater than 0"),
    categoryId: z.coerce.number().int().positive("categoryId must be a positive integer")
});

const updateMenuItemSchema = z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    price: z.coerce.number().positive().optional(),
    available: z.boolean().optional(),
    categoryId: z.coerce.number().int().positive().optional()
});

module.exports = {
    createMenuItemSchema,
    updateMenuItemSchema
};