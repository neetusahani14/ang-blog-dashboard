import { inject, Injectable } from '@angular/core';

import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Posts {

  firestore = inject(Firestore);
  constructor(private toastr: ToastrService, private router: Router) { }

  // ✅ Load all posts

  loadData(): Observable<any[]> {
    const colRef = collection(this.firestore, 'posts');
    return collectionData(colRef, { idField: 'id' }); // AngularFire helper
  }

  // ✅ Add new post
  async addPost(data: any) {
    const colRef = collection(this.firestore, 'posts');
    const docRef = await addDoc(colRef, data);
    return { id: docRef.id, ...data };
  }

  loadOneData(id: string) {
    const docRef = doc(this.firestore, 'posts', id);
    return docData(docRef, { idField: 'id' });
  }

  async updatePost(id: string, data: any) {
    const docRef = doc(this.firestore, 'posts', id);
    await updateDoc(docRef, data);

    // ✅ show success and navigate before returning
    this.toastr.success('Post updated successfully!', 'Success');
    this.router.navigate(['/posts']);

    return { id, ...data };
  }

}
