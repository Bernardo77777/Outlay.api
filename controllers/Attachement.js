const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new attachment
exports.create = async (req, res) => {
    const { descriptionId } = req.params;
    const file = req.file ? req.file.filename : null;

    // Check if file is not null
    if (!file) {
        return res.status(400).json({ error: "File is required" });
    }

    // Check if descriptionId is valid
    const descriptionIdInt = parseInt(descriptionId);
    if (isNaN(descriptionIdInt)) {
        return res.status(400).json({ error: "Invalid description ID" });
    }

    try {
        const attachment = await prisma.attachment.create({
            data: {
                file: file,
                description: {
                    connect: {
                        id: descriptionIdInt // Ensure descriptionId is parsed to an integer
                    }
                }
            }
        });
        res.status(201).json(attachment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

// Read a single attachment by ID
exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const attachment = await prisma.attachment.findUnique({
            where: { id: parseInt(id) }
        });
        if (attachment) {
            res.json(attachment);
        } else {
            res.status(404).json({ error: 'Attachment not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an attachment
exports.update = async (req, res) => {
    const { id } = req.params;
    const { descriptionId } = req.body;
    const file = req.file ? req.file.filename : null;
    try {
        const attachment = await prisma.attachment.update({
            where: { id: parseInt(id) },
            data: {
                file,
                description: {
                    connect: { id: parseInt(descriptionId) }
                }
            }
        });
        res.json(attachment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Download an attachment file by ID
exports.download = async (req, res) => {
    const { id } = req.params;
    try {
        const attachment = await prisma.attachment.findUnique({
            where: { id: parseInt(id) }
        });
        if (attachment) {
            const file = attachment.file;
            res.download(`uploads/${file}`);
        } else {
            res.status(404).json({ error: 'Attachment not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.attachment.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'attachment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

