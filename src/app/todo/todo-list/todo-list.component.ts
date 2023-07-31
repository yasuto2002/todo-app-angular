import { Component, OnInit } from '@angular/core';
import { TodoResponse } from 'src/app/models/todo/TodoResponse.model';
import { TodoService } from 'src/app/service/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit  {
  constructor(public todoService:TodoService){}
  displayedColumns: string[] = ['title', 'body', 'state','category','edit','delete'];
  dataSource:TodoResponse[] = [];
  log(id:number):void{
    console.log(id)
  }

  getTodos():void{
    this.todoService.getTodos().subscribe(todos => this.dataSource = todos)
  }

  ngOnInit():void{
    this.getTodos();
  }
  
}
