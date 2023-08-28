import { TodoIdResponse } from 'src/app/models/todo/TodoIdResponse.model';
import { TodoResponse } from 'src/app/models/todo/TodoResponse.model';
import { TodoListResponse } from 'src/app/models/todo/TodoListResponse.model';
import { State, StateContext, Selector, Action } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { TodoAction } from './todo.actions';
import { TodoService } from 'src/app/service/todo/todo.service';
import { finalize, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

export class TodoStateModel {
  todos: TodoListResponse[] | null = [];
  todo: TodoResponse | null = null;
  todoId!: HttpResponse<TodoIdResponse> | null;
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
    todo: null,
    todoId: null,
  },
})
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {}

  @Action(TodoAction.GetAll)
  getAllTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.GetAll) {
    return this.todoService.getTodos().pipe(
      tap((todos) => {
        ctx.patchState({ todos: todos });
      }),
    );
  }

  @Action(TodoAction.Get)
  getTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.Get) {
    return this.todoService.getTodo(action.todoId).pipe(
      tap((todo) => {
        ctx.patchState({ todo: todo });
      }),
    );
  }

  @Action(TodoAction.Add)
  addTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.Add) {
    return this.todoService.addTodo(action.todoRequest).pipe(
      tap((todoId) => {
        ctx.patchState({ todoId: todoId });
      }),
    );
  }

  @Action(TodoAction.Update)
  updateTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.Update) {
    return this.todoService.updateTodo(action.todoRequest, action.todoId).pipe(
      tap((todo) => {
        ctx.patchState({ todo: todo });
      }),
    );
  }

  @Action(TodoAction.Delete)
  deleteTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.Delete) {
    return this.todoService.deleteTodo(action.todoId).pipe(
      finalize(() => {
        ctx.dispatch(new TodoAction.GetAll());
      }),
    );
  }

  @Selector()
  static todoId(state: TodoStateModel) {
    return state.todoId;
  }

  @Selector()
  static todos(state: TodoStateModel) {
    return state.todos;
  }

  @Selector()
  static todo(state: TodoStateModel) {
    return state.todo;
  }
}
