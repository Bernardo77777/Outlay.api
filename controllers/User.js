const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Create a new user
exports.create = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email, password, isAdmin }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read all users
exports.getAll = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

// Read a single user by ID
exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a user
exports.update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, isAdmin } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email, password, isAdmin }
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
