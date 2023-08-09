import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CategoryResponse } from 'src/app/models/category/CategoryResponse.model';
import { ACTIVE, IS_ACTIVE, IS_INACTIVE } from 'src/app/models/todo/State';
import { CategoryService } from 'src/app/service/category/category.service';
import { TodoRequest } from 'src/app/models/todo/TodoRequest.model';
import { TodoService } from 'src/app/service/todo/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,private todoService:TodoService,private router: Router){}

  todoFb = this.formBuilder.group({
    title: ['', [Validators.required,Validators.pattern("^[0-9a-zA-Zぁ-んーァ-ンヴー一-龠]*$")]],
    body: ['',[Validators.required,Validators.pattern("^[0-9a-zA-Zぁ-んーァ-ンヴー一-龠\s]*$")]],
    state_code: [0,Validators.required],
    category_id: [0,Validators.required],
  });

  categories: CategoryResponse[] = [];

  states = [IS_INACTIVE,IS_ACTIVE,ACTIVE]

  onSubmit():void{
    const todoRequest: TodoRequest = this.todoFb.value as TodoRequest;
    this.todoService.addTodo(todoRequest).subscribe(_ => this.router.navigate(["todo"]));
  }

  getCategories():void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  } 

  ngOnInit():void{
    this.getCategories();
  }
}
