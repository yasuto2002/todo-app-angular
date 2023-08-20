import { Component,OnInit,OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';
import { CategoryResponse } from 'src/app/models/category/CategoryResponse.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit,OnDestroy {

  constructor(private categoryService:CategoryService){}

 categories:Array<CategoryResponse> = []

 subscription:Subscription = new Subscription()

  ngOnInit():void{
    this.getCategory();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCategory():void{
    this.subscription = this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  deleteCategory(category_id:number):void{
    this.subscription = this.categoryService.deleteCategory(category_id).subscribe( categories => this.categories = categories)
  }

}
