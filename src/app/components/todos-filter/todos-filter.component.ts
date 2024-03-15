import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TodosFilter } from '../../store/todo.store';

@Component({
  selector: 'todos-filter',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './todos-filter.component.html',
  styleUrl: './todos-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosFilterComponent {
  todoFilter = model.required<TodosFilter>();
}
