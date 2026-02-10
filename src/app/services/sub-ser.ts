import { inject, Injectable } from '@angular/core';
import { collection,collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubSer {

  firestore = inject(Firestore);
  constructor(private toastr: ToastrService) { }

  loadData(): Observable<any[]> {
    const colRef = collection(this.firestore, 'subscribers');
    return collectionData(colRef, { idField: 'id' }); // AngularFire helper
  } 

  //   deleteData(id: string) {
  //   const docRef = doc(this.firestore, 'categories', id);

  //   deleteDoc(docRef)
  //     .then(() => {
  //       // ✅ Success toast
  //       this.toastr.success('Category deleted successfully!', 'Deleted');
  //     })
  //     .catch(error => {
  //       // ❌ Error toast
  //       this.toastr.error('Delete failed: ' + error.message, 'Error');
  //     });
  // }

    deleteData(id: string) {
    const docRef = doc(this.firestore, `subscribers/${id}`);
    deleteDoc(docRef)
      .then(() => {
        this.toastr.success('Subscriber deleted successfully!', 'Deleted');
      })
      .catch(error => {
        this.toastr.error('Delete failed: ' + error.message, 'Error');
      });
  }
  } 