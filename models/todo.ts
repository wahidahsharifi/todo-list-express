import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
}

const TodoSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITodo>('Todo', TodoSchema);