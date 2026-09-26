const prisma = require("../utils/prisma");

// Create menu item
const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;

        if (!name || !price || !categoryId) {
            return res.status(400).json({
                message: "Name, price and categoryId are required"
            });
        }

        const menuItem = await prisma.menuItem.create({
            data: {
                name,
                description,
                price,
                categoryId: Number(categoryId)
            }
        });

        res.status(201).json({
            message: "Menu item created successfully",
            menuItem
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create menu item"
        });
    }
};

// Get all menu items
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await prisma.menuItem.findMany({
            include: {
                category: true
            },
            orderBy: {
                id: "asc"
            }
        });

        res.status(200).json(menuItems);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch menu items"
        });
    }
};

// Get one menu item
const getMenuItemById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const menuItem = await prisma.menuItem.findUnique({
            where: { id },
            include: {
                category: true
            }
        });

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch menu item"
        });
    }
};

// Update menu item
const updateMenuItem = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, description, price, available, categoryId } = req.body;

        const menuItem = await prisma.menuItem.update({
            where: { id },
            data: {
                name,
                description,
                price,
                available,
                categoryId: categoryId ? Number(categoryId) : undefined
            }
        });

        res.status(200).json({
            message: "Menu item updated successfully",
            menuItem
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update menu item"
        });
    }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.menuItem.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Menu item deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete menu item"
        });
    }
};

module.exports = {
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
};