const { z } = require("zod");

const createReservationSchema = z.object({
    customerName: z.string().min(2, "Customer name must be at least 2 characters"),
    customerPhone: z.string().min(10, "Phone number must be at least 10 characters"),
    date: z.coerce.date(),
    guests: z.coerce.number().int().positive("Guests must be greater than 0"),
    tableId: z.coerce.number().int().positive()
});

const updateReservationSchema = z.object({
    status: z.enum([
        "PENDING",
        "CONFIRMED",
        "CANCELLED",
        "COMPLETED"
    ])
});

module.exports = {
    createReservationSchema,
    updateReservationSchema
};