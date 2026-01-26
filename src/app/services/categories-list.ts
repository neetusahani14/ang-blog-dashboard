import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CategoriesList {
  
  firestore = inject(Firestore);
  constructor(private toastr:ToastrService){

  }
  

  async saveData(data:any){
    
    try {
      const docRef = await addDoc(collection(this.firestore, 'categories'), data);
      console.log(docRef.id);
      this.toastr.success('Data Insert successfully...!')
    } catch (error) {
      console.error(error);
    }
    addDoc(collection(this.firestore, 'categories'), data).then((docRef)=>{
      console.log(docRef.id);   
    })
    
    .catch(error=>{ console.log(error) });
  }

  // loadData(){
  //   addDoc(collection(this.firestore, 'categories'), data).snapshotChanges().pipe(
  //     map(actions =>{
  //       actions.map(a=>
  //       {
  //         const data = a.payload.doc.data();
  //         const id = a.payload.doc.id;

  //       }
  //       )
  //     })
  //   )
  // }

//   loadData() {
//   return this.firestore.collection('categories').snapshotChanges().pipe(
//     map(actions =>
//       actions.map(a => {
//         const data = a.payload.doc.data() as any;
//         const id = a.payload.doc.id;
//         return { id, ...data };   // ✅ return combined object
//       })
//     )
//   );
// }

//   async addCategory(data: any) {
//   // Get a reference to the "categories" collection
//   const colRef = collection(this.firestore, 'categories');

//   // Add a new document with the provided data
//   const docRef = await addDoc(colRef, data);

//   // Return the new document ID
//   return docRef.id;
// }

 // ✅ Read categories with IDs
  loadData(): Observable<any[]> {
    const colRef = collection(this.firestore, 'categories');
    return collectionData(colRef, { idField: 'id' }); // AngularFire helper
  }

  // ✅ Add new category
  async addCategory(data: any) {
    const colRef = collection(this.firestore, 'categories');
    const docRef = await addDoc(colRef, data);
    return { id: docRef.id, ...data };
  }


  
}
