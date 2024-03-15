import { Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'todos-input',
  standalone: true,
  imports: [MatInputModule, MatIcon],
  templateUrl: './todos-input.component.html',
  styleUrl: './todos-input.component.scss',
})
export class TodosInputComponent {
  todoEnter = output<string>();
}
