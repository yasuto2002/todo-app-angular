import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: '',      component: TodoListComponent },
  { path: 'create',component: TodoCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
