import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Todo } from '../model/todo.model';
import { TodosService } from '../services/todos.service';
import { computed, inject } from '@angular/core';

export type TodosFilter = 'all' | 'pending' | 'completed';

type TodoState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  filter: 'all',
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todosService = inject(TodosService)) => ({
    async loadAll() {
      patchState(store, {
        loading: true,
      });
      const todos = await todosService.getTodos();
      patchState(store, {
        todos,
        loading: false,
      });
    },
    async addTodo(title: string) {
      const todo = await todosService.addTodo({ title });
      patchState(store, (state) => ({
        todos: [...state.todos, todo],
      }));
    },
    async deleteTodo(id: number) {
      const deletedTodo = await todosService.deleteTodo(id);
      if (deletedTodo) {
        patchState(store, (state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      }
    },
    async updateTodo(id: number, completed: boolean) {
      const todo = await todosService.updateTodo(id, completed);
      patchState(store, (state) => ({
        todos: state.todos.map((t) => (t.id === id ? todo : t)),
      }));
    },
    updateFilter(filter: TodosFilter) {
      patchState(store, {
        filter,
      });
    },
  })),
  withComputed(({ todos, filter }) => ({
    filteredTodos: computed(() => {
      switch (filter()) {
        case 'all':
          return todos();
        case 'pending':
          return todos().filter((todo) => !todo.completed);
        case 'completed':
          return todos().filter((todo) => todo.completed);
        default:
          return todos();
      }
    }),
  }))
);
