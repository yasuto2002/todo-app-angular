import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CategoryResponse } from 'src/app/models/category/CategoryResponse.model';
import { ACTIVE, IS_ACTIVE, IS_INACTIVE } from 'src/app/models/todo/State';
import { CategoryService } from 'src/app/service/category/category.service';
import { TodoRequest } from 'src/app/models/todo/TodoRequest.model';
import { TodoService } from 'src/app/service/todo/todo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TodoResponse } from 'src/app/models/todo/TodoResponse.model';
import { Observable, Subscription } from 'rxjs';
import { TodoAction } from 'src/app/store/todo/todo.actions';
import { TodoState, TodoStateModel } from 'src/app/store/todo/todo.state';
import { Select } from '@ngxs/store';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.scss'],
})
export class TodoUpdateComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private todoService: TodoService,
    private router: Router,
    private store: Store,
  ) {}

  @Select(TodoState.todo) todo$!: Observable<TodoResponse>;

  todoFb = this.formBuilder.group({
    title: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9a-zA-Zぁ-んーァ-ンヴー一-龠]*$'),
      ],
    ],
    body: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9a-zA-Zぁ-んーァ-ンヴー一-龠s]*$'),
      ],
    ],
    state_code: [0, Validators.required],
    category_id: [0, Validators.required],
  });

  todoId = 0;

  categories: CategoryResponse[] = [];

  states = [IS_INACTIVE, IS_ACTIVE, ACTIVE];

  subscription: Subscription = new Subscription();

  onSubmit(): void {
    const todoRequest: TodoRequest = this.todoFb.value as TodoRequest;

    this.store
      .dispatch(new TodoAction.Update(todoRequest, this.todoId))
      .subscribe((_) => this.router.navigate(['todo']));
  }

  getCategories(): void {
    this.subscription.add(
      this.categoryService
        .getCategories()
        .subscribe((categories) => (this.categories = categories)),
    );
  }

  getTodo(todoId: number): void {
    this.store.dispatch(new TodoAction.Get(todoId)).subscribe((_) => {
      this.subscription.add(
        this.todo$.subscribe((todo) => {
          this.todoFb.controls.title.setValue(todo.title);
          this.todoFb.controls.body.setValue(todo.body);
          this.todoFb.controls.state_code.setValue(todo.state_code);
          this.todoFb.controls.category_id.setValue(todo.category_id);
        }),
      );
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe((params) => {
        this.todoId = +params['id'];
      }),
    );
    this.getCategories();
    this.getTodo(this.todoId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
