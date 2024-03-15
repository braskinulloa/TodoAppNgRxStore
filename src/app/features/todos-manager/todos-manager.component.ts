import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TodosFilterComponent } from '../../components/todos-filter/todos-filter.component';
import { TodosInputComponent } from '../../components/todos-input/todos-input.component';
import { TodosListComponent } from '../../components/todos-list/todos-list.component';
import { TodosFilter, TodosStore } from '../../store/todo.store';

@Component({
  selector: 'todos-manager',
  standalone: true,
  imports: [
    TodosListComponent,
    TodosInputComponent,
    TodosFilterComponent,
    MatProgressSpinner,
  ],
  templateUrl: './todos-manager.component.html',
  styleUrl: './todos-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosManagerComponent {
  store = inject(TodosStore);
  onAddTodo(title: string) {
    this.store.addTodo(title);
  }
  onFilterChange(filter: TodosFilter) {
    this.store.updateFilter(filter);
  }
  onDeleteTodo(id: number) {
    this.store.deleteTodo(id);
  }
  onTodoToggled(id: number, completed: boolean) {
    this.store.updateTodo(id, completed);
  }
}
