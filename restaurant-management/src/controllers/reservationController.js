const prisma = require("../utils/prisma");

// Create reservation
const createReservation = async (req, res) => {
    try {
        const {
            customerName,
            customerPhone,
            date,
            guests,
            tableId
        } = req.body;

        if (!customerName || !customerPhone || !date || !guests || !tableId) {
            return res.status(400).json({
                message: "customerName, customerPhone, date, guests and tableId are required"
            });
        }

        const reservationDate = new Date(date);

        if (isNaN(reservationDate.getTime())) {
            return res.status(400).json({
                message: "Invalid reservation date"
            });
        }

        // Check whether the table exists
        const table = await prisma.restaurantTable.findUnique({
            where: {
                id: Number(tableId)
            }
        });

        if (!table) {
            return res.status(404).json({
                message: "Table not found"
            });
        }

        // Check table capacity
        if (Number(guests) > table.capacity) {
            return res.status(400).json({
                message: `Table capacity is only ${table.capacity}`
            });
        }

        // Check for an existing reservation at the same table and date
        const existingReservation = await prisma.reservation.findFirst({
            where: {
                tableId: Number(tableId),
                date: reservationDate,
                status: {
                    in: ["PENDING", "CONFIRMED"]
                }
            }
        });

        if (existingReservation) {
            return res.status(409).json({
                message: "Table is already reserved for this date and time"
            });
        }

        const reservation = await prisma.reservation.create({
            data: {
                customerName,
                customerPhone,
                date: reservationDate,
                guests: Number(guests),
                tableId: Number(tableId)
            }
        });

        res.status(201).json({
            message: "Reservation created successfully",
            reservation
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create reservation"
        });
    }
};

// Get all reservations
const getReservations = async (req, res) => {
    try {
        const reservations = await prisma.reservation.findMany({
            include: {
                table: true
            },
            orderBy: {
                date: "asc"
            }
        });

        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch reservations"
        });
    }
};

// Get reservation by ID
const getReservationById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const reservation = await prisma.reservation.findUnique({
            where: { id },
            include: {
                table: true
            }
        });

        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        res.status(200).json(reservation);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch reservation"
        });
    }
};

// Update reservation status
const updateReservation = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;

        const reservation = await prisma.reservation.update({
            where: { id },
            data: {
                status
            }
        });

        res.status(200).json({
            message: "Reservation updated successfully",
            reservation
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update reservation"
        });
    }
};

module.exports = {
    createReservation,
    getReservations,
    getReservationById,
    updateReservation
};