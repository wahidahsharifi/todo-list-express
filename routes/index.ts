import express from 'express';
const router = express.Router();
import type { Request, Response } from 'express';
import { validateTodoInput } from '../validators/todoValidator';
import Todo from '../models/todo';

router.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html');
})

router.get('/notes', async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find({}).lean();
        console.log('items sent')
        res.json(todos)
    } catch (err) {
        console.error(err)
    }
    
})

router.post('/todo', async (req: any, res: any) => {
    const validation = validateTodoInput(req.body);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
    }
    
    try {
        // Create and save the new todo
        console.log(req.body)
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json({ message: 'Todo created', todo });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err });
    }

    console.log(req.body);
})

router.put('/completion', async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const { id, state } = req.body;
        await Todo.findByIdAndUpdate(id, { completed: state });
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error', details: err });
    }
})

router.delete('/todo/:id', async (req: Request, res: Response) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true });
    } catch (err) {
        console.error('err')
        res.status(500).json({ error: err });
    }
})

export default router