import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CategoryResponse } from 'src/app/models/category/CategoryResponse.model';
import { ACTIVE, IS_ACTIVE, IS_INACTIVE } from 'src/app/models/todo/State';
import { CategoryService } from 'src/app/service/category/category.service';
import { TodoRequest } from 'src/app/models/todo/TodoRequest.model';
import { TodoService } from 'src/app/service/todo/todo.service';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { TodoResponse } from 'src/app/models/todo/TodoResponse.model';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.scss']
})
export class TodoUpdateComponent implements OnInit {

  constructor(private route:ActivatedRoute,private formBuilder: FormBuilder, private categoryService: CategoryService,private todoService:TodoService,private router: Router){}

  todoFb = this.formBuilder.group({
    title: ['', [Validators.required,Validators.pattern("^[0-9a-zA-Zぁ-んーァ-ンヴー一-龠]*$")]],
    body: ['',[Validators.required,Validators.pattern("^[0-9a-zA-Zぁ-んーァ-ンヴー一-龠\s]*$")]],
    state_code: [0,Validators.required],
    category_id: [0,Validators.required],
  });

  todoId:number = 0

  todo: TodoResponse | null = null;

  categories: CategoryResponse[] = [];

  states = [IS_INACTIVE,IS_ACTIVE,ACTIVE]

  onSubmit():void{
    const todoRequest: TodoRequest = this.todoFb.value as TodoRequest;
    this.todoService.updateTodo(todoRequest,this.todoId).subscribe(_ => this.router.navigate(["todo"]));
  }

  getCategories():void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  } 

  getTodo(id:number):void{
    this.todoService.getTodo(id).subscribe(todo => {
      this.todoFb.controls.title.setValue(todo.title);
      this.todoFb.controls.body.setValue(todo.body);
      this.todoFb.controls.state_code.setValue(todo.state_code);
      this.todoFb.controls.category_id.setValue(todo.category_id);
    })
  }

  ngOnInit():void{
    this.route.params.subscribe(params => {
      this.todoId = +params['id']; 
    });
    this.getCategories();
    this.getTodo(this.todoId);
  }

}
