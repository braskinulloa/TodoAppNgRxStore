import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosManagerComponent } from './features/todos-manager/todos-manager.component';
import { TodosStore } from './store/todo.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, TodosManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(TodosStore);

  constructor() {}
  ngOnInit(): void {
    this.loadTodos().then(() => console.log('todos loaded'));
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}
