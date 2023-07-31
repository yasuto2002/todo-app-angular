import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TodoResponse } from '../../models/todo/TodoResponse.model';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService implements InMemoryDbService {

  createDb() {
    const todo: TodoResponse[] = [
      {id: 1, title: 'Hydrogen', category_name: "フロントエンド", body: 'ボディ',state: 1},
      {id: 2, title: 'Helium', category_name: "フロントエンド", body: 'ボディ',state: 2},
      {id: 3, title: 'Lithium', category_name: "フロントエンド", body: 'ボディ',state: 1},
      {id: 4, title: 'Beryllium', category_name: "フロントエンド", body: 'ボディ',state: 1},
      {id: 5, title: 'Boron', category_name: "フロントエンド", body: 'ボディ',state: 1},
    ];
    return {todo};
  }

  genId(todos: TodoResponse[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 11;
  }
}
