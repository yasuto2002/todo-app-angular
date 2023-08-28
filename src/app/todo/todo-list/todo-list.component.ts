import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListResponse } from 'src/app/models/todo/TodoListResponse.model';
import { TodoService } from 'src/app/service/todo/todo.service';
import { CategoryService } from 'src/app/service/category/category.service';
import { Observable, Subscription } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { toState } from 'src/app/models/todo/State';
import { TodoState } from 'src/app/store/todo/todo.state';
import { TodoAction } from 'src/app/store/todo/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'body',
    'state',
    'category',
    'edit',
    'delete',
  ];
  constructor(
    public todoService: TodoService,
    private store: Store,
    public categoryService: CategoryService,
  ) {}

  todos: TodoListResponse[] = [];

  @Select(TodoState.todos) todos$!: Observable<TodoListResponse[]>;

  getTodos(): void {
    this.store.dispatch(new TodoAction.GetAll());
  }

  ngOnInit(): void {
    this.getTodos();
  }

  todoDelete(todoId: number) {
    this.store.dispatch(new TodoAction.Delete(todoId));
  }
}
