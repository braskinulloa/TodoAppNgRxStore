import { Injectable } from '@angular/core';
import { TODOS } from '../model/mock-data';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  async getTodos() {
    await sleep(2000);
    return TODOS;
  }
  async addTodo(todo: Pick<Todo, 'title'>): Promise<Todo> {
    await sleep(500);
    return {
      ...todo,
      id: Date.now(),
      completed: false,
    };
  }

  async deleteTodo(id: number): Promise<Todo | undefined> {
    await sleep(500);
    let index = -1;
    const deletedTodo = TODOS.find((todo, i) => {
      if (todo.id === id) {
        index = i;
        return todo.id === id;
      }
      return false;
    });
    TODOS.splice(index, 1);
    return deletedTodo;
  }

  async updateTodo(id: number, completed: boolean): Promise<Todo> {
    await sleep(500);
    const todoIndex = TODOS.findIndex((t) => t.id === id);
    TODOS[todoIndex].completed = completed;
    return TODOS[todoIndex];
  }
}

async function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
