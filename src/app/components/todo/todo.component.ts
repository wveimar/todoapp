import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FilterType, TodoModel } from '../../models/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todoList = signal<TodoModel[]>([
    {
      id: 1,
      title: 'buy milk',
      completed: false,
      editing: false,
    },
    {
      id: 2,
      title: 'buy bread',
      completed: false,
      editing: false,
    },
    {
      id: 3,
      title: 'buy cheese',
      completed: false,
      editing: false,
    },
  ]);

  filter = signal<FilterType>("all");

  changeFilter(filterString: FilterType){
  this.filter.set(filterString);
  }
}
