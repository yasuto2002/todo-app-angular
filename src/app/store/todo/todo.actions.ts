import { TodoRequest } from 'src/app/models/todo/TodoRequest.model';

export namespace TodoAction {
  export class GetAll {
    static readonly type = '[Todo] GetAll';
  }

  export class Get {
    static readonly type = '[Todo] Get';
    constructor(public todoId: number) {}
  }

  export class Add {
    static readonly type = '[Todo] Add';
    constructor(public todoRequest: TodoRequest) {}
  }

  export class Update {
    static readonly type = '[Todo] Update';
    constructor(
      public todoRequest: TodoRequest,
      public todoId: number,
    ) {}
  }

  export class Delete {
    static readonly type = '[Todo] Delete';
    constructor(public todoId: number) {}
  }
}
