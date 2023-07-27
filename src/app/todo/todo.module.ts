import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class TodoModule { }
