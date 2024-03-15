import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [MatButtonToggleModule, MatListModule, MatIcon, NgStyle],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  todos = input<Todo[]>([]);
  todoDelete = output<number>();
  todoChange = output<Pick<Todo, 'id' | 'completed'>>();

  onTodoToggled(id: number, completed: boolean) {
    this.todoChange.emit({ id, completed });
  }
  onDeleteTodo(id: number, $event: MouseEvent) {
    $event.stopPropagation();
    this.todoDelete.emit(id);
  }
}
