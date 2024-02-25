import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { FilterType, TodoModel } from '../../models/todo';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {


constructor() {
  effect(() =>{
    localStorage.setItem('todos', JSON.stringify(this.todoList()));
  })

}

  ngOnInit(): void {
    const storage =localStorage.getItem('todos');
    if (storage) {
      this.todoList.set(JSON.parse(storage))
    }
  }
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

  todoListFilter = computed(() => {
    const filter = this.filter();
    const todos = this.todoList();
  
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  });
  

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
            }
          : todo;
      })
    );
  }

  removeTodo(todoId: number) {
    this.todoList.update((prev_todos) =>
      prev_todos.filter((todo) => todo.id !== todoId)
    );
  }

  updateTodoEditingMode(todoId: number) {
    return this.todoList.update((prev_todos) =>
      prev_todos.map((todo) => {
        return todo.id === todoId
          ? {
              ...todo,
              editing: true,
            }
          : {
              ...todo,
              editing: false,
            };
      })
    );
  }

  saveTitleTodo(todoId: number, event: Event) {
    const title = (event.target as HTMLInputElement).value;
    console.log({ title });
    return this.todoList.update((prev_todos) =>
      prev_todos.map((todo) => {
        return todo.id === todoId
          ? {
              ...todo,
              title: title,
              editing: false,
            }
          : todo;
      })
    );
  }
}
