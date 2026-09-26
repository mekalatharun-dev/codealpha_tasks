const { z } = require("zod");

const createOrderSchema = z.object({
    items: z.array(
        z.object({
            menuItemId: z.coerce.number().int().positive(),
            quantity: z.coerce.number().int().positive()
        })
    ).min(1, "At least one order item is required"),

    tableId: z.coerce.number().int().positive().optional(),

    userId: z.coerce.number().int().positive().optional()
});

const updateOrderStatusSchema = z.object({
    status: z.enum([
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "READY",
        "SERVED",
        "CANCELLED"
    ])
});

module.exports = {
    createOrderSchema,
    updateOrderStatusSchema
};