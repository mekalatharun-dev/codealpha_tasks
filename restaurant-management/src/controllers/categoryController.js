const prisma = require("../utils/prisma");

// Create category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        const category = await prisma.category.create({
            data: {
                name
            }
        });

        res.status(201).json({
            message: "Category created successfully",
            category
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create category"
        });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                menuItems: true
            },
            orderBy: {
                id: "asc"
            }
        });

        res.status(200).json(categories);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch categories"
        });
    }
};

module.exports = {
    createCategory,
    getCategories
};