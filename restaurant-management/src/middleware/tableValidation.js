const { z } = require("zod");

const createTableSchema = z.object({
    tableNumber: z.coerce.number().int().positive(),
    capacity: z.coerce.number().int().positive()
});

const updateTableSchema = z.object({
    tableNumber: z.coerce.number().int().positive().optional(),
    capacity: z.coerce.number().int().positive().optional(),
    status: z.enum(["AVAILABLE", "OCCUPIED", "RESERVED"]).optional()
});

module.exports = {
    createTableSchema,
    updateTableSchema
};