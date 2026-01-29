import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { CategoriesList } from '../../services/categories-list';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Post } from '../../models/post';


@Component({
  selector: 'app-new-post',
  imports: [RouterLink, FormsModule, CommonModule, AngularEditorModule,ReactiveFormsModule],
  templateUrl: './new-post.html',
  styleUrl: './new-post.css',
})
export class NewPost {
  permalink:any ='';
  imgSrc:any ='assets/placeholder-img.jpg';
  selectedImg:any;
  categories:any[]=[];
  postForm!: FormGroup;

  constructor(private categoryService:CategoriesList, private fb:FormBuilder){
    this.postForm = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(10)]],
      permalink:[{ value: '', disabled: true }, [Validators.required]],
      excerpt:['',[Validators.required, Validators.minLength(50)] ],
      category:['', Validators.required],
      postImg:[null, Validators.required],
      content:['', Validators.required]
    })

  }

  ngOnInit():void{
    this.categoryService.loadData().subscribe(val=> {
      this.categories = val;
    })
  }

  get fc(){
    return this.postForm.controls
  }

  // onTitleChange($event:any){
  //   // console.log($event.target.value);
  //   const title = $event.target.value;
  //  this.permalink = title.replace(/\s/g, '-');
    
  // }
  onTitleChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  const title = input.value;

  // Generate slug
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')   // replace spaces & special chars with hyphen
    .replace(/^-+|-+$/g, '');      // remove leading/trailing hyphens

  // Update the reactive form control
  this.postForm.patchValue({ permalink: slug });
}
// showPreview(event: Event): void {
//   const input = event.target as HTMLInputElement;

//   if (input.files && input.files.length > 0) {
//     const reader = new FileReader();

//     reader.onload = () => {
//       this.imgSrc = reader.result as string; // safe cast
//     };

//     reader.readAsDataURL(input.files[0]);
//     reader.readAsDataURL(this.selectedImg);

//   }
// }

showPreview(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    const file = input.files[0];   // ✅ File object
    this.selectedImg = file;       // store file if needed

    const reader = new FileReader();
    reader.onload = () => {
      this.imgSrc = reader.result as string; // base64 string for preview
    };
    reader.readAsDataURL(file);    // ✅ only one call
  }
}

onSubmit(){
   
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);
    
    const postData : Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category:{
        categoryId:splitted[0],
        category:splitted[1]
      },
      postImgPath:'',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured:false,
      views:0,
      status:'new',
      createdAt:new Date()
    }   
    console.log(postData);
    
}
}
