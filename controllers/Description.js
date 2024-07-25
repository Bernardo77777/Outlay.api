const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new description
exports.create = async (req, res) => {
    // Extract `costId` from request parameters and `text` from request body
    // const { costId } = req.params;
    const { text, costId } = req.body;

    try {
        // Convert `costId` to integer if necessary (depends on your schema)
        const parsedCostId = parseInt(costId);

        // Check if `parsedCostId` is valid
        if (isNaN(parsedCostId)) {
            return res.status(400).json({ error: "Invalid cost ID" });
        }

        // Find the cost record
        const cost = await prisma.cost.findUnique({
            where: {
                id: parsedCostId, // Use the parsed integer ID
            }
        });

        // If no cost record is found, return a 404 status
        if (!cost) {
            return res.status(404).json({ error: "Cost record not found" });
        }

        // Create a new description record
        const desc = await prisma.description.create({
            data: {
                text: text,
                cost: {
                    connect: { id: parsedCostId } // Connect to the existing cost
                }
            }
        });

        // Respond with the created description and a 201 status
        res.status(201).json(desc);
    } catch (error) {
        // Log the error and respond with a 500 status
        console.error("Error creating description:", error);
        res.status(500).json({ error: error.message });
    }
};

// Read a single description by ID
exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const desc = await prisma.description.findUnique({
            where: { costId: parseInt(id) },
        });
        if (desc) {
            res.json(desc);
        } else {
            res.status(404).json({ error: 'Description not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a description
exports.update = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const desc = await prisma.description.update({
            where: { id: parseInt(id) },
            data: { text }
        });
        res.json(desc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Excluir um description
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.description.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Description deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

