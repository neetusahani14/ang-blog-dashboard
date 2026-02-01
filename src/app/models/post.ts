// export interface Post {
//     title:string,
//     permalink:string,
//     category:{
//         categoryId:string,
//         category:string
//     },
//     postImgPath: string,
//     excerpt:string,
//     content:string,
//     isFeatured:boolean,
//     views:number,
//     status:string,
//     createdAt:Date
// }

export interface Post {
  title: string;
  permalink: string;
  category: {
    categoryId: string;
    category: string;
  };
  postImgPath: string;   // secure_url
  postImgId: string;     // ✅ public_id (new field)
  excerpt: string;
  content: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createdAt: Date;
}
