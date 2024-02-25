import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FilterType, TodoModel } from '../../models/todo';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
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
      completed: true,
      editing: false,
    },
  ]);

  filter = signal<FilterType>('all');

  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  changeFilter(filterString: FilterType) {
    this.filter.set(filterString);
  }

  addTodo() {
    const newTodoTitle = this.newTodo.value.trim();
    if (this.newTodo.valid && newTodoTitle !== '') {
      this.todoList.update((prev_todos) => {
        return [
          ...prev_todos,
          { id: prev_todos.length + 1, title: newTodoTitle, completed: false },
        ];
      });
      this.newTodo.reset();
    } else {
      this.newTodo.reset();
    }
  }

  toggleTodo(todoId: number) {
    return this.todoList.update((prev_todos) =>
      prev_todos.map((todo) => {
        return todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
            }:
             todo;
      })
    );
  }
}
