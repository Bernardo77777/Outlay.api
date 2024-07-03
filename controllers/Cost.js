const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo custo
exports.create = async (req, res) => {
    const { name, cost, date, ispaid, Payment, userId } = req.body;
    try {
        const newCost = await prisma.cost.create({
            data: {
                name,
                cost,
                date,
                ispaid,
                Payment,
                user: { connect: { id: userId } }
            }
        });
        res.status(201).json(newCost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obter um custo pelo ID
exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const cost = await prisma.cost.findUnique({
            where: { id: parseInt(id) },
            include: { user: true, descriptions: true }
        });
        if (cost) {
            res.json(cost);
        } else {
            res.status(404).json({ error: 'Cost not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const costs = await prisma.cost.findMany({
            include: { user: true, descriptions: true }
        });
        res.json(costs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get all de usuario especifico
exports.getAllByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const costs = await prisma.cost.findMany({
            where: {
                userId: Number(userId)
            },
            include: {
                user: true,
                descriptions: true
            }
        });
        res.json(costs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Atualizar um custo
exports.update = async (req, res) => {
    const { id } = req.params;
    const { name,cost, date, ispaid, Payment } = req.body;
    try {
        const updatedCost = await prisma.cost.update({
            where: { id: parseInt(id) },
            data: { name,cost, date, ispaid, Payment }
        });
        res.json(updatedCost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Excluir um custo
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.cost.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Cost deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
