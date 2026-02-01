// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ActivatedRoute, Router, RouterLink } from "@angular/router";
// import { CategoriesList } from '../../services/categories-list';
// import { CommonModule } from '@angular/common';
// import { AngularEditorModule } from '@kolkov/angular-editor';
// import { Post } from '../../models/post';
// import { Firestore, collection, addDoc } from '@angular/fire/firestore';
// import { ToastrService } from 'ngx-toastr';
// import { Posts} from '../../services/posts';


// @Component({
//   selector: 'app-new-post',
//   imports: [RouterLink, FormsModule, CommonModule, AngularEditorModule, ReactiveFormsModule],
//   templateUrl: './new-post.html',
//   styleUrl: './new-post.css',
// })
// export class NewPost {
//   permalink: any = '';
//   imgSrc: any = 'assets/placeholder-img.jpg';
//   selectedImg: any;
//   categories: any[] = [];
//   postForm!: FormGroup;
//   formStatus: string = 'Add Name';
//   postId: string | null = null; 

//   constructor(private categoryService: CategoriesList, private fb: FormBuilder,
//     private firestore: Firestore,
//     private toastr: ToastrService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private postService: Posts
//   ) {

//     this.route.queryParamMap.subscribe(params => {
//       this.postId = params.get('id');
//       if (!this.postId) {
//         return;
//       }
//       this.postService.loadOneData(params.get('id') as string).subscribe((val:any) => {
//       this.postForm = this.fb.group({
//           title: [val.title, [Validators.required, Validators.minLength(10)]],
//           permalink: [val.permalink, [Validators.required]],
//           excerpt: [val.excerpt, [Validators.required, Validators.minLength(50)]],
//           category: [`${val.category.categoryId}-${val.category.category}`, Validators.required],
//           postImg: [val.postImgPath , Validators.required],
//       content: [val.content, Validators.required]
//     })
//     this.imgSrc = val.postImgPath;
//     this.formStatus = 'Edit Post';
//       });
//     });

//   }

//   ngOnInit(): void {
//     this.categoryService.loadData().subscribe(val => {
//       this.categories = val;
//     })
//   }

//   get fc() {
//     return this.postForm.controls
//   }
//   onTitleChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     const title = input.value;

//     const slug = title
//       .trim()
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')   // replace spaces & special chars with hyphen
//       .replace(/^-+|-+$/g, '');      // remove leading/trailing hyphens

//     this.postForm.patchValue({ permalink: slug });
//   }

//   showPreview(event: Event): void {
//     const input = event.target as HTMLInputElement;

//     if (input.files && input.files.length > 0) {
//       const file = input.files[0];   // ✅ File object
//       this.selectedImg = file;       // store file if needed

//       const reader = new FileReader();
//       reader.onload = () => {
//         this.imgSrc = reader.result as string; // base64 string for preview
//       };
//       reader.readAsDataURL(file);    // ✅ only one call

//       // ✅ Upload to Cloudinary
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', 'angular_upload'); // Cloudinary preset

//       fetch('https://api.cloudinary.com/v1_1/dkevofpqe/image/upload', {
//         method: 'POST',
//         body: formData
//       })
//         .then(res => res.json())
//         .then(data => {
//           console.log('Cloudinary full response:', data); // ✅ check actual keys
//           this.postForm.patchValue({ postImg: data.secure_url });
//           console.log('Patched postImg:', this.postForm.value.postImg);

//         });
//     }
//   }

//   async onSubmit() {
//     let splitted = this.postForm.value.category.split('-');
//     // console.log(splitted);
//     const postData: Post = {
//       title: this.postForm.value.title,
//       permalink: this.postForm.value.permalink,
//       category: {
//         categoryId: splitted[0],
//         category: splitted[1]
//       },
//       postImgPath: this.postForm.value.postImg,
//       excerpt: this.postForm.value.excerpt,
//       content: this.postForm.value.content,
//       isFeatured: false,
//       views: 0,
//       status: 'new',
//       createdAt: new Date()
//     }
// if (this.formStatus === 'Edit Post' && this.postId) {
//     await this.postService.updatePost(this.postId, postData);
//     this.toastr.success('Post updated successfully!');
//   } else {
//     const postsRef = collection(this.firestore, 'posts');
//     await addDoc(postsRef, postData);
//     this.toastr.success('Post created successfully!');
//   }

//   this.router.navigate(['/posts']);
//   this.postForm.reset();
//   this.imgSrc = 'assets/placeholder-img.jpg';
//   this.formStatus = 'Add Post';   // reset back

//   }


// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CategoriesList } from '../../services/categories-list';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Post } from '../../models/post';
import { ToastrService } from 'ngx-toastr';
import { Posts } from '../../services/posts';

@Component({
  selector: 'app-new-post',
  imports: [RouterLink, FormsModule, CommonModule, AngularEditorModule, ReactiveFormsModule],
  templateUrl: './new-post.html',
  styleUrl: './new-post.css',
})
export class NewPost {
  permalink: string = '';
  imgSrc: string = 'assets/placeholder-img.jpg';
  selectedImg: File | null = null;
  categories: any[] = [];
  postForm!: FormGroup;
  formStatus: string = 'Add Post';
  postId: string | null = null;

  constructor(
    private categoryService: CategoriesList,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private postService: Posts
  ) {
    this.route.queryParamMap.subscribe(params => {
      this.postId = params.get('id');
      if (this.postId) {
        this.postService.loadOneData(this.postId).subscribe((val: any) => {
          this.postForm = this.fb.group({
            title: [val.title, [Validators.required, Validators.minLength(10)]],
            permalink: [val.permalink, Validators.required],
            excerpt: [val.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${val.category.categoryId}-${val.category.category}`, Validators.required],
            postImg: [val.postImgPath, Validators.required],
            postImgId: [val.postImgId, Validators.required],   // ✅ new field
            content: [val.content, Validators.required]
          });
          this.imgSrc = val.postImgPath;
          this.formStatus = 'Edit Post';
        });
      } else {
        this.initForm();
      }
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    });
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      postImgId: ['', Validators.required],   // ✅ new field
      content: ['', Validators.required]
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const title = input.value;
    const slug = title.trim().toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')   // replace spaces & special chars with hyphen
      .replace(/^-+|-+$/g, '');      // remove leading/trailing hyphens
    this.postForm.patchValue({ permalink: slug });
  }

  showPreview(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImg = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imgSrc = reader.result as string;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'angular_upload');

      // fetch('https://api.cloudinary.com/v1_1/dkevofpqe/image/upload', {
      //   method: 'POST',
      //   body: formData
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     // ✅ Patch both secure_url and public_id
      //     this.postForm.patchValue({ 
      //       postImg: data.secure_url,
      //       postImgId: data.public_id
      //     });
      //     this.imgSrc = data.secure_url;

      //     // ✅ If editing, update Firestore immediately
      //     if (this.postId) {
      //       this.postService.updatePost(this.postId, { 
      //         postImgPath: data.secure_url,
      //         postImgId: data.public_id
      //       });
      //       this.toastr.success('Image updated successfully!');
      //     }
      //   });
      fetch('https://api.cloudinary.com/v1_1/dkevofpqe/image/upload', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          this.postForm.patchValue({
            postImg: data.secure_url,
            postImgId: data.public_id   // ✅ save public_id
          });
          this.imgSrc = data.secure_url;
        });
    }
  }

  async onSubmit() {
    let splitted = this.postForm.value.category.split('-');
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: this.postForm.value.postImg,   // secure_url
      postImgId: this.postForm.value.postImgId,   // public_id ✅
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    };

    if (this.formStatus === 'Edit Post' && this.postId) {
      await this.postService.updatePost(this.postId, postData);
      this.toastr.success('Post updated successfully!');
    } else {
      await this.postService.addPost(postData);
      this.toastr.success('Post created successfully!');
    }

    this.router.navigate(['/posts']);
    this.postForm.reset();
    this.imgSrc = 'assets/placeholder-img.jpg';
    this.formStatus = 'Add Post';
  }
}