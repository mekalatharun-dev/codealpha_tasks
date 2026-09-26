const prisma = require("../utils/prisma");

// Create order with automatic inventory deduction
const createOrder = async (req, res) => {
    try {
        const { items, tableId, userId } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Order items are required"
            });
        }

        // Use a transaction so order creation and inventory deduction
        // either both succeed or both fail.
        const result = await prisma.$transaction(async (tx) => {

            let total = 0;
            const orderItemsData = [];
            const inventoryRequirements = {};

            // Process each ordered menu item
            for (const item of items) {
                const menuItemId = Number(item.menuItemId);
                const quantity = Number(item.quantity);

                if (!menuItemId || !quantity || quantity <= 0) {
                    throw new Error("Invalid menu item or quantity");
                }

                // Find menu item
                const menuItem = await tx.menuItem.findUnique({
                    where: {
                        id: menuItemId
                    },
                    include: {
                        ingredients: {
                            include: {
                                inventoryItem: true
                            }
                        }
                    }
                });

                if (!menuItem) {
                    throw new Error(`Menu item ${menuItemId} not found`);
                }

                if (!menuItem.available) {
                    throw new Error(`${menuItem.name} is currently unavailable`);
                }

                // Calculate item total
                const itemTotal =
                    Number(menuItem.price) * quantity;

                total += itemTotal;

                orderItemsData.push({
                    menuItemId,
                    quantity,
                    unitPrice: menuItem.price
                });

                // Calculate required inventory
                for (const ingredient of menuItem.ingredients) {
                    const inventoryId = ingredient.inventoryItemId;

                    const requiredQuantity =
                        Number(ingredient.quantityRequired) * quantity;

                    if (!inventoryRequirements[inventoryId]) {
                        inventoryRequirements[inventoryId] = 0;
                    }

                    inventoryRequirements[inventoryId] += requiredQuantity;
                }
            }

            // Check inventory availability
            for (const inventoryId in inventoryRequirements) {
                const requiredQuantity =
                    inventoryRequirements[inventoryId];

                const inventoryItem =
                    await tx.inventoryItem.findUnique({
                        where: {
                            id: Number(inventoryId)
                        }
                    });

                if (!inventoryItem) {
                    throw new Error(
                        `Inventory item ${inventoryId} not found`
                    );
                }

                if (
                    Number(inventoryItem.quantity) <
                    requiredQuantity
                ) {
                    throw new Error(
                        `Insufficient stock for ${inventoryItem.name}. Available: ${inventoryItem.quantity}, Required: ${requiredQuantity}`
                    );
                }
            }

            // Create order
            const order = await tx.order.create({
                data: {
                    total: total.toFixed(2),
                    tableId: tableId
                        ? Number(tableId)
                        : undefined,
                    userId: userId
                        ? Number(userId)
                        : undefined,

                    items: {
                        create: orderItemsData
                    }
                },
                include: {
                    items: {
                        include: {
                            menuItem: true
                        }
                    }
                }
            });

            // Deduct inventory
            for (const inventoryId in inventoryRequirements) {
                const requiredQuantity =
                    inventoryRequirements[inventoryId];

                const inventoryItem =
                    await tx.inventoryItem.findUnique({
                        where: {
                            id: Number(inventoryId)
                        }
                    });

                await tx.inventoryItem.update({
                    where: {
                        id: Number(inventoryId)
                    },
                    data: {
                        quantity:
                            Number(inventoryItem.quantity) -
                            requiredQuantity
                    }
                });
            }

            return order;
        });

        res.status(201).json({
            message: "Order created successfully",
            order: result
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message || "Failed to create order"
        });
    }
};


// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        menuItem: true
                    }
                },
                table: true
            },
            orderBy: {
                id: "desc"
            }
        });

        res.status(200).json(orders);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
};


// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const order = await prisma.order.findUnique({
            where: {
                id
            },
            include: {
                items: {
                    include: {
                        menuItem: true
                    }
                },
                table: true
            }
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch order"
        });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;

        const validStatuses = [
            "PENDING",
            "CONFIRMED",
            "PREPARING",
            "READY",
            "SERVED",
            "CANCELLED"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        const order = await prisma.order.update({
            where: {
                id
            },
            data: {
                status
            }
        });

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update order status"
        });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
};