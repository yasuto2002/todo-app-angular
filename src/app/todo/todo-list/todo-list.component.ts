import { Component, OnInit } from '@angular/core';
import { TodoListResponse } from 'src/app/models/todo/TodoListResponse.model';
import { TodoService } from 'src/app/service/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit  {
  constructor(public todoService:TodoService){}
  displayedColumns: string[] = ['title', 'body', 'state','category','edit','delete'];
  todos:TodoListResponse[] = [];

  getTodos():void{
    this.todoService.getTodos().subscribe(todos => this.todos = todos)
  }

  ngOnInit():void{
    this.getTodos();
  }

  todoDelete(todoId:number){
    this.todoService.deleteTodo(todoId).subscribe(_ => this.getTodos())
  }
  
}
