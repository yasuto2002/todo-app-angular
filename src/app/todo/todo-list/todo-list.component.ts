import { Component, OnInit } from '@angular/core';
import { TodoResponse } from 'src/app/models/todo/TodoResponse.model';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent implements OnInit  {
  todos: TodoResponse[] = [
    {id: 1, title: 'Hydrogen', category: "フロントエンド", body: 'ボディ',state: 1},
    {id: 2, title: 'Helium', category: "フロントエンド", body: 'ボディ',state: 2},
    {id: 3, title: 'Lithium', category: "フロントエンド", body: 'ボディ',state: 3},
    {id: 4, title: 'Beryllium', category: "フロントエンド", body: 'ボディ',state: 1},
    {id: 5, title: 'Boron', category: "フロントエンド", body: 'ボディ',state: 1},
  ];
  constructor(public todoService:TodoService){}
  displayedColumns: string[] = ['title', 'body', 'state','category','edit','delete'];
  dataSource:TodoResponse[] = this.todos;
  log(id:number):void{
    console.log(id)
  }


  ngOnInit():void{
  }
  
}
