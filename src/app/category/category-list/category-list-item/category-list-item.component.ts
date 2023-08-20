import { Component , Input } from '@angular/core';
import { CategoryResponse } from 'src/app/models/category/CategoryResponse.model';
import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss']
})
export class CategoryListItemComponent {

  @Input() category!:CategoryResponse;

  constructor(public categoryService:CategoryService){}
}
