const prisma = require("../utils/prisma");

// Create restaurant table
const createTable = async (req, res) => {
    try {
        const { tableNumber, capacity } = req.body;

        if (!tableNumber || !capacity) {
            return res.status(400).json({
                message: "Table number and capacity are required"
            });
        }

        const table = await prisma.restaurantTable.create({
            data: {
                tableNumber: Number(tableNumber),
                capacity: Number(capacity)
            }
        });

        res.status(201).json({
            message: "Table created successfully",
            table
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create table"
        });
    }
};

// Get all tables
const getTables = async (req, res) => {
    try {
        const tables = await prisma.restaurantTable.findMany({
            orderBy: {
                tableNumber: "asc"
            }
        });

        res.status(200).json(tables);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch tables"
        });
    }
};

// Get table by ID
const getTableById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const table = await prisma.restaurantTable.findUnique({
            where: { id }
        });

        if (!table) {
            return res.status(404).json({
                message: "Table not found"
            });
        }

        res.status(200).json(table);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch table"
        });
    }
};

// Update table
const updateTable = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { tableNumber, capacity, status } = req.body;

        const table = await prisma.restaurantTable.update({
            where: { id },
            data: {
                tableNumber: tableNumber !== undefined
                    ? Number(tableNumber)
                    : undefined,
                capacity: capacity !== undefined
                    ? Number(capacity)
                    : undefined,
                status
            }
        });

        res.status(200).json({
            message: "Table updated successfully",
            table
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update table"
        });
    }
};

module.exports = {
    createTable,
    getTables,
    getTableById,
    updateTable
};