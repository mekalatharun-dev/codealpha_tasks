const prisma = require("../utils/prisma");

// Get low stock items
const getLowStockItems = async (req, res) => {
    try {
        const inventoryItems = await prisma.inventoryItem.findMany();

        const lowStockItems = inventoryItems.filter(
            (item) => Number(item.quantity) <= Number(item.minStock)
        );

        res.status(200).json({
            count: lowStockItems.length,
            items: lowStockItems
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch low stock items"
        });
    }
};

const getDailySales = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const orders = await prisma.order.findMany({
            where: {
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                status: {
                    not: "CANCELLED"
                }
            }
        });

        const totalSales = orders.reduce(
            (sum, order) => sum + Number(order.total),
            0
        );

        res.status(200).json({
            date: startOfDay.toISOString().split("T")[0],
            totalOrders: orders.length,
            totalSales: totalSales.toFixed(2)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to generate daily sales report"
        });
    }
};

module.exports = {
    getLowStockItems,
    getDailySales
};