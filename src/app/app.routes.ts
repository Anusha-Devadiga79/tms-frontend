import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { AddTask } from './pages/add-task/add-task';
import { EditTask } from './pages/edit-task/edit-task';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'add-task', component: AddTask },
  { path: 'edit-task/:id', component: EditTask },
  { path: '**', redirectTo: 'login' }
];
