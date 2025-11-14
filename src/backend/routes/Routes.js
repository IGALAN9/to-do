import express from 'express';
import { Todo } from '../models/Todo.js';

const router = express.Router();

// GET / - List all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (e) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

// POST / - Create new todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description });
    res.status(201).json(todo);
  } catch (e) {
    if (e.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: e.errors.map(err => err.message) });
    }
    res.status(500).json({ error: e.message });
  }
});

// PUT /:id - Update todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo tidak ditemukan" });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    res.json(todo);
  } catch (e) {
    if (e.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: e.errors.map(err => err.message) });
    }
    res.status(500).json({ error: e.message });
  }
});

// DELETE /:id - Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo tidak ditemukan" });
    }

    await todo.destroy();
    res.json({ message: "Todo berhasil dihapus", id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;