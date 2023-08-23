import { Component, Input, Output } from '@angular/core';
import { CategoryResponse } from 'src/app/models/category/CategoryResponse.model';
import { CategoryService } from 'src/app/service/category/category.service';
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss'],
})
export class CategoryListItemComponent {
  @Input() category!: CategoryResponse;

  @Output() deleteCategory = new EventEmitter<number>();

  constructor(public categoryService: CategoryService) {}

  subscription: Subscription = new Subscription();

  onSubmit(category_id: number) {
    this.deleteCategory.emit(category_id);
  }
}
