const prisma = require("./prisma");

async function testDatabase() {
    try {
        await prisma.$connect();
        console.log("PostgreSQL connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testDatabase();