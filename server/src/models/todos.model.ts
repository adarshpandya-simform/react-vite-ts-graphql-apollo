import { Model, model, Schema } from 'mongoose';
import { Todo } from './todos.interface';

const todosSchema: Schema<Todo> = new Schema<Todo>({
  title: { required: true, type: String, maxlength: 50 },
  completed: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now() },
});

export const TodosModel: Model<Todo> = model<Todo>('todo', todosSchema);
