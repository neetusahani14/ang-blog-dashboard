import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CategoriesList } from '../services/categories-list';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {

  constructor(private categorySer:CategoriesList){}

  ngOnInit():void{
    this.categorySer.loadData().subscribe(val=>{
      console.log(val);
      
    })
  }
   onSubmit(categoryForm: any){

    let categoryData: Category= {
      category : categoryForm.value.category,
    
    }
     this.categorySer.saveData(categoryData);

//      let subCategoryData= {
//       subCategory : 'subCategory1'
//     }
    
// // 
    // try {
    //   const docRef = await addDoc(collection(this.firestore, 'categories'), categoryData);
    //   console.log(docRef.id);
    // } catch (error) {
    //   console.error(error);
    // }
    // addDoc(collection(this.firestore, 'categories'), categoryData).then((docRef)=>{
    //   console.log(docRef.id);
    // addDoc(collection(this.firestore, 'categories',docRef.id,'subCategories'), subCategoryData).then((subCatRef)=>{
    //     console.log(subCatRef.id);
    
    // addDoc(collection(this.firestore, 'categories',docRef.id,'subsubCategories',subCatRef.id,'items'), { itemName: 'item1' }).then((itemRef)=>{
    //       console.log('saved successfully',itemRef.id);  
    //   })
    // })
      
    // })
    
  //   .catch(error=>{ console.log(error) });
    
  }
}

