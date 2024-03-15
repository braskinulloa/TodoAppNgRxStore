import {
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import {
  MatButtonToggleChange,
  MatButtonToggleGroup,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Todo } from '../../model/todo.model';
import { TodosFilter, TodosStore } from '../../store/todo.store';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatIcon,
    MatButtonToggleModule,
    MatListModule,
    NgStyle,
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  todos = input<Todo[]>([]);
  store = inject(TodosStore);
  input = viewChild(MatInput);
  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }
  onAddTodo(title: string) {
    this.store.addTodo(title);
    this.input()!.value = '';
  }
  onDeleteTodo(id: number, $event: MouseEvent) {
    $event.stopPropagation();
    this.store.deleteTodo(id);
  }
  onTodoToggled(id: number, completed: boolean) {
    this.store.updateTodo(id, completed);
  }
  onFilterChange(event: MatButtonToggleChange) {
    const filter: TodosFilter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }
}
