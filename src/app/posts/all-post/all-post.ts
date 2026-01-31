import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Posts } from '../../services/posts';


@Component({
  selector: 'app-all-post',
  imports: [RouterLink,CommonModule],
  templateUrl: './all-post.html',
  styleUrl: './all-post.css',
})
export class AllPost {

  postArray: any[] = [];

  constructor(private postService: Posts){}

  ngOnInit():void{
    this.postService.loadData().subscribe(val=>{
      console.log(val); 
      this.postArray = val;
    });
  }

}
