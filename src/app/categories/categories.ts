// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

// @Component({
//   selector: 'app-categories',
//   imports: [FormsModule],
//   templateUrl: './categories.html',
//   styleUrl: './categories.css',
// })
// export class Categories {

//   constructor(private firestore: AngularFirestore) {}

//   onSubmit(categoryForm: any){
//     let categoryData = {
//       category : categoryForm.value.category,
//     }

//     this.firestore.collection('categories').add(categoryData).then(docRef=>{
//       console.log(docRef);
      
//     })
//     .catch(error=>{ console.log(error) });
    
//   }
// }

// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Firestore, collection, addDoc } from '@angular/fire/firestore';

// @Component({
//   selector: 'app-categories',
//   standalone: true,              // ✅ standalone component
//   imports: [FormsModule],
//   templateUrl: './categories.html',
//   styleUrls: ['./categories.css'] // ✅ plural styleUrls
// })
// export class Categories {
//   firestore = inject(Firestore); // ✅ inject modular Firestore

//   async onSubmit(categoryForm: any) {
//     const categoryData = {
//       category: categoryForm.value.category,
//     };

//     try {
//       const docRef = await addDoc(collection(this.firestore, 'categories'), categoryData);
//       console.log('Document written with ID:', docRef.id);
//     } catch (error) {
//       console.error('Error adding document:', error);
//     }
//   }
// }


import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})
export class Categories {
  firestore = inject(Firestore);

  async onSubmit(categoryForm: any) {
    const categoryData = { category: categoryForm.value.category };

    try {
      const docRef = await addDoc(collection(this.firestore, 'categories'), categoryData);
      console.log('Document written with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }
}