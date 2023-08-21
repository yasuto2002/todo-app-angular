import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListResponse } from 'src/app/models/todo/TodoListResponse.model';
import { TodoService } from 'src/app/service/todo/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {

  constructor(public todoService:TodoService){}

  displayedColumns: string[] = ['title', 'body', 'state','category','edit','delete'];

  todos:TodoListResponse[] = [];

  subscription:Subscription = new Subscription()

  getTodos():void{
    this.subscription = this.todoService.getTodos().subscribe(todos => this.todos = todos)
  }

  ngOnInit():void{
    this.getTodos();
  }

  todoDelete(todoId:number){
    this.subscription = this.todoService.deleteTodo(todoId).subscribe( todos => this.todos = todos)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
}
