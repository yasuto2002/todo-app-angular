import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CategoryResponse } from 'src/app/models/category/CategoryResponse.model';
import { ACTIVE, IS_ACTIVE, IS_INACTIVE } from 'src/app/models/todo/State';
import { CategoryService } from 'src/app/service/category/category.service';
import { TodoRequest } from 'src/app/models/todo/TodoRequest.model';
import { TodoService } from 'src/app/service/todo/todo.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { TodoIdResponse } from 'src/app/models/todo/TodoIdResponse.model';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Store, Select } from '@ngxs/store';
import { TodoState } from 'src/app/store/todo/todo.state';
import { TodoAction } from 'src/app/store/todo/todo.actions';
import { ErrorAction } from 'src/app/store/eroor/error.action';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
})
export class TodoCreateComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private todoService: TodoService,
    private router: Router,
    private store: Store,
  ) {}

  @Select(TodoState.todoId) toidId$!: Observable<HttpResponse<TodoIdResponse>>;

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

  categories: CategoryResponse[] = [];

  states = [IS_INACTIVE, IS_ACTIVE, ACTIVE];

  subscription: Subscription = new Subscription();

  onSubmit(): void {
    const todoRequest: TodoRequest = this.todoFb.value as TodoRequest;
    this.store.dispatch(new TodoAction.Add(todoRequest)).subscribe((_) => {
      this.subscription.add(
        this.toidId$.subscribe((response: HttpResponse<TodoIdResponse>) => {
          if (response.headers.get('Location') != null) {
            const newTodoId = new URL(
              response.headers.get('Location')!,
              environment.apiUrl,
            ).pathname
              .split('/todo/')
              .pop();
            this.router.navigate(['todo/update', newTodoId]);
          } else {
            this.store.dispatch(
              new ErrorAction.Set('Location header could not be read'),
            );
            this.router.navigate(['error']);
          }
        }),
      );
    });
  }

  getCategories(): void {
    this.subscription.add(
      this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories;
        this.setCategory();
      }),
    );
  }

  ngOnInit(): void {
    this.getCategories();
  }

  // category初期値
  setCategory(): void {
    if (0 < this.categories.length) {
      this.todoFb.controls.category_id.setValue(
        this.categories[this.categories.length - 1].id,
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
