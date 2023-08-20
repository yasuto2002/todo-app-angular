import { Component,OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';
import { CategoryResponse } from 'src/app/models/category/CategoryResponse.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private categorySevice:CategoryService){}

 categories:Array<CategoryResponse> = []

  ngOnInit():void{
    this.getCategory();
  }

  getCategory():void{
    this.categorySevice.getCategories().subscribe(categories => this.categories = categories);
  }

}
