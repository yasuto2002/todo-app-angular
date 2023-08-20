import { Component,OnInit,OnDestroy } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RED,BLUE,GREEN } from 'src/app/models/category/Color';
import { Subscription } from 'rxjs';
import { CategoryRequest } from 'src/app/models/category/CategoryRequest.model';
import { CategoryResponse } from 'src/app/models/category/CategoryResponse.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,private router: Router,private route:ActivatedRoute){}

  categoryFb = this.formBuilder.group({
    name: ['', [Validators.required,Validators.pattern("^[0-9a-zA-Zぁ-んーァ-ンヴー一-龠]*$")]],
    slug: ['',[Validators.required,Validators.pattern("^[0-9a-zA-Zぁ-んーァ-ンヴー一-龠\s]*$")]],
    color_code: [RED.code,Validators.required],
  });

  subscription:Subscription = new Subscription()

  colors = [RED,BLUE,GREEN]

  categoryId:number = 0

  category: CategoryResponse | null = null

  onSubmit(): void{
    const categoryRequest:CategoryRequest = this.categoryFb.value as CategoryRequest;
    this.subscription = this.categoryService.updateCategory(categoryRequest,this.categoryId).subscribe(_ => this.router.navigate(["category"]))
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.categoryId = +params['id']; 
    });
    this.getCategory();
  }
  getCategory(){
    this.subscription = this.categoryService.getCategory(this.categoryId).subscribe(categpry => {
      this.categoryFb.controls.name.setValue(categpry.name);
      this.categoryFb.controls.slug.setValue(categpry.slug);
      this.categoryFb.controls.color_code.setValue(categpry.color_code);
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
