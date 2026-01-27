import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';

import { CategoriesList } from '../services/categories-list';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {

  categoryArray: any[]= [];
  formCategory : any;
  formStatus: string ='Add';
  categoryId: any;

  constructor(private categorySer:CategoriesList){}

  ngOnInit():void{
    this.categorySer.loadData().subscribe(val=>{
      console.log(val);
      this.categoryArray = val;
      
    })
  }
   onSubmit(categoryForm: any){

    let categoryData: Category= {
      category : categoryForm.value.category,
    
    }
    if(this.formStatus == 'Add')
    {
       this.categorySer.saveData(categoryData);
     categoryForm.reset();
    }
    else if(this.formStatus == 'Edit')
    {
      this.categorySer.updateData(this.categoryId, categoryData);
      categoryForm.reset();
      this.formStatus = 'Add';
    }   
  }

  onEdit(category:any, id:any){
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id; 
  }

  onDelete(id:any){
    this.categorySer.deleteData(id);
  }
}

