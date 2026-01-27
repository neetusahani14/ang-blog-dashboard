import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,doc, updateDoc,deleteDoc } from '@angular/fire/firestore';
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

  updateData(id: string, editData: any) {
  const docRef = doc(this.firestore, 'categories', id);
  updateDoc(docRef, editData).then(()=>
  {
      this.toastr.success('Data updated successfully...!')
  })
  }

   deleteData(id: string) {
    const docRef = doc(this.firestore, 'categories', id);

    deleteDoc(docRef)
      .then(() => {
        // ✅ Success toast
        this.toastr.success('Category deleted successfully!', 'Deleted');
      })
      .catch(error => {
        // ❌ Error toast
        this.toastr.error('Delete failed: ' + error.message, 'Error');
      });
  }

  
}
