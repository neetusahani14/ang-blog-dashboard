import { inject, Injectable } from '@angular/core';

import { Firestore, collection, addDoc, collectionData,doc, updateDoc,deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Post {

  firestore = inject(Firestore);

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
}
