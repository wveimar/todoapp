import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/todo',
  },

  {
    path: 'todo',
    component: TodoComponent,
  },
];
