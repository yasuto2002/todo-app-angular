import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoUpdateComponent } from './todo-update/todo-update.component';

@NgModule({
  declarations: [TodoListComponent, TodoCreateComponent, TodoUpdateComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TodoModule {}
