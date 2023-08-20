import { Component,OnInit,OnDestroy } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category/category.service';
import { Router } from '@angular/router';
import { RED,BLUE,GREEN } from 'src/app/models/category/Color';
import { Subscription } from 'rxjs';
import { CategoryRequest } from 'src/app/models/category/CategoryRequest.model';
import { CategoryIdResponse } from 'src/app/models/category/CategoryIdResponse.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit,OnDestroy {

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,private router: Router){}

  categoryFb = this.formBuilder.group({
    name: ['', [Validators.required,Validators.pattern("^[0-9a-zA-Zぁ-んーァ-ンヴー一-龠]*$")]],
    slug: ['',[Validators.required,Validators.pattern("^[0-9a-zA-Zぁ-んーァ-ンヴー一-龠\s]*$")]],
    color_code: [RED.code,Validators.required],
  });

  subscription:Subscription = new Subscription()

  colors = [RED,BLUE,GREEN]


  onSubmit(): void{
    const categoryRequest:CategoryRequest = this.categoryFb.value as CategoryRequest
    this.subscription = this.categoryService.addCategory(categoryRequest).subscribe((response: HttpResponse<CategoryIdResponse>) => {
      this.router.navigate(["category"])
    });
  }  

   ngOnInit(): void {


     
   }

   ngOnDestroy(): void {
     
   }

}
