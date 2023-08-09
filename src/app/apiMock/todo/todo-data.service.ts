import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TodoResponse } from '../../models/todo/TodoResponse.model';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService implements InMemoryDbService {

  createDb() {
    const todo: TodoResponse[] = [
      {id: 1, title: 'Hydrogen', category_name: "フロントエンド", body: 'ボディ',state_code: 1},
      {id: 2, title: 'Helium', category_name: "フロントエンド", body: 'ボディ',state_code: 2},
      {id: 3, title: 'Lithium', category_name: "フロントエンド", body: 'ボディ',state_code: 1},
      {id: 4, title: 'Beryllium', category_name: "フロントエンド", body: 'ボディ',state_code: 1},
      {id: 5, title: 'Boron', category_name: "フロントエンド", body: 'ボディ',state_code: 1},
    ];
    const category = [
      { id: 1, name: 'フロントエンド', slug: "front", color_id: 1  },
      { id: 2, name: 'バックエンド', slug: "back",  color_id: 2 },
      { id: 3, name: 'インフラ', slug: "infra",   color_id: 3  }
    ];
    return {todo,category};
  }

  genId(todos: TodoResponse[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 11;
  }
}
