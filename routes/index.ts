import express from 'express';
const router = express.Router();
import type { Request, Response } from 'express';
import { validateTodoInput } from '../validators/todoValidator';
import Todo from '../models/todo';

router.get('/', (req: Request, res: Response) => {
    res.send('<h1>hello</h1>')
})

router.post('/todo', async (req: any, res: any) => {
    const validation = validateTodoInput(req.body);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
    }
    
    try {
        // Create and save the new todo
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json({ message: 'Todo created', todo });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err });
    }

    console.log(req.body);
})

router.delete('/todo/:id', async (req: Request, res: Response) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.redirect('/')
    } catch (err) {
        console.error('err')
        res.send('<h1 style="text-align: center">500 server error</h1>')
    }

})

export default router