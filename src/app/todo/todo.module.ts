import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
  ]
})
export class TodoModule { }
