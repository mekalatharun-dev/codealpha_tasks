const prisma = require("../utils/prisma");

// Create inventory item
const createInventoryItem = async (req, res) => {
    try {
        const { name, quantity, unit, minStock } = req.body;

        if (!name || quantity === undefined || !unit) {
            return res.status(400).json({
                message: "Name, quantity and unit are required"
            });
        }

        const inventoryItem = await prisma.inventoryItem.create({
            data: {
                name,
                quantity: Number(quantity),
                unit,
                minStock: minStock !== undefined ? Number(minStock) : 10
            }
        });

        res.status(201).json({
            message: "Inventory item created successfully",
            inventoryItem
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create inventory item"
        });
    }
};

// Get all inventory items
const getInventoryItems = async (req, res) => {
    try {
        const inventoryItems = await prisma.inventoryItem.findMany({
            orderBy: {
                id: "asc"
            }
        });

        res.status(200).json(inventoryItems);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch inventory items"
        });
    }
};

// Get inventory item by ID
const getInventoryItemById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const inventoryItem = await prisma.inventoryItem.findUnique({
            where: { id }
        });

        if (!inventoryItem) {
            return res.status(404).json({
                message: "Inventory item not found"
            });
        }

        res.status(200).json(inventoryItem);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch inventory item"
        });
    }
};

// Update inventory item
const updateInventoryItem = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, quantity, unit, minStock } = req.body;

        const inventoryItem = await prisma.inventoryItem.update({
            where: { id },
            data: {
                name,
                quantity: quantity !== undefined ? Number(quantity) : undefined,
                unit,
                minStock: minStock !== undefined ? Number(minStock) : undefined
            }
        });

        res.status(200).json({
            message: "Inventory item updated successfully",
            inventoryItem
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update inventory item"
        });
    }
};

module.exports = {
    createInventoryItem,
    getInventoryItems,
    getInventoryItemById,
    updateInventoryItem
};