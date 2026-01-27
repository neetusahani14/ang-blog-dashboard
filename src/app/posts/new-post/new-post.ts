import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-new-post',
  imports: [RouterLink, FormsModule],
  templateUrl: './new-post.html',
  styleUrl: './new-post.css',
})
export class NewPost {
  permalink:any ='';
  imgSrc:any ='assets/placeholder-img.jpg';
  selectedImg:any;

  onTitleChange($event:any){
    // console.log($event.target.value);
    const title = $event.target.value;
   this.permalink = title.replace(/\s/g, '-');
    
  }

//   showPreview($event:Event){
//     const reader = new FileReader();
//     reader.onload=(e : ProgressEvent<FileReader>)=>{
//     if(e.target){
//       this.imgSrc = e.target.result as string;
//     }
//   }
//   reader.readAsDataURL(event?.target.files[0])
  
// }
showPreview(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    const reader = new FileReader();

    reader.onload = () => {
      this.imgSrc = reader.result as string; // safe cast
    };

    reader.readAsDataURL(input.files[0]);
    reader.readAsDataURL(this.selectedImg);

  }
}
}
