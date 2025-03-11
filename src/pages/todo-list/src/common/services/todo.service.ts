import type { ITodo } from '@/pages/todo-list/src/common/intefaces'

export default class TodoService {
  static async getTodos(): Promise<ITodo[]> {
    const response = await fetch("https://dummyjson.com/todos");
    const data = await response.json();
    return data.todos;
  }
}
