import { HttpClient } from '@angular/common/http';
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
  constructor(private toastr: ToastrService, private router: Router,
    private http: HttpClient
  ) { }

  // ✅ Load all posts

  loadData(): Observable<any[]> {
    const colRef = collection(this.firestore, 'posts');
    return collectionData(colRef, { idField: 'id' }); // AngularFire helper
  }

  // ✅ Add new post
async addPost(data: any, cloudinaryResponse?: any) {
  const colRef = collection(this.firestore, 'posts');

  // ✅ Merge Cloudinary response if available
  const postData = {
    ...data,
    postImgPath: cloudinaryResponse?.secure_url || data.postImgPath,
    postImgId: cloudinaryResponse?.public_id || data.postImgId
  };

  const docRef = await addDoc(colRef, postData);
  return { id: docRef.id, ...postData };
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

// async deletePostWithImage(postId: string, publicId: string) {
//   try {
//     this.http.delete<any>(`http://localhost:3000/delete-image/${publicId}`)
//       .subscribe({
//         next: async (res) => {
//           if (res.success) {
//             this.toastr.success('Image deleted successfully!');

//             // ✅ Delete Firestore post
//             const docRef = doc(this.firestore, 'posts', postId);
//             await deleteDoc(docRef);

//             this.toastr.success('Post deleted successfully!', 'Success');
//           } else {
//             this.toastr.error('Failed to delete image');
//           }
//         },
//         error: (err) => {
//           console.error('Delete error:', err);
//           this.toastr.error('Error deleting image');
//         }
//       });
//   } catch (error) {
//     console.error('Delete flow error:', error);
//     this.toastr.error('Error deleting post');
//   }
// }

async deletePostWithImage(postId: string, publicId: string) {
  console.log('Deleting with publicId:', publicId); // ✅ Debugging

  if (!publicId) {
    this.toastr.error('Image ID not found, cannot delete');
    return;
  }

  this.http.delete<any>(`http://localhost:3000/delete-image/${publicId}`)
    .subscribe({
      next: async (res) => {
        if (res.success) {
    
          const docRef = doc(this.firestore, 'posts', postId);
          await deleteDoc(docRef);
          this.toastr.warning('Post deleted successfully!');
        }
      },
      error: (err) => {
        console.error('Delete error:', err);
        this.toastr.error('Error deleting image');
      }
    });
}

markAsFeatured(postId: string, isFeatured: boolean) {
  const docRef = doc(this.firestore, 'posts', postId);
  return updateDoc(docRef, { isFeatured }).then(() => {
    this.toastr.info('Featured status updated');
  });
}
}
