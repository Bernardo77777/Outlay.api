const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new description
exports.create = async (req, res) => {
    const { text, costId } = req.body;
    try {
        const desc = await prisma.description.create({
            data: {
                text,
                cost: {
                    connect: { id: costId }
                }
            }
        });
        res.status(201).json(desc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read a single description by ID
exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const desc = await prisma.description.findUnique({
            where: { id: parseInt(id) },
            include: { attachments: true } // Include attachments in the response
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
