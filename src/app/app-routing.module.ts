import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error-dashboard/error/error.component';

const routes: Routes = [
  { path: 'todo', component: TodoListComponent },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
