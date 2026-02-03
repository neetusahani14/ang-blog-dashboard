import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Categories } from './categories/categories';
import { AllPost } from './posts/all-post/all-post';
import { NewPost } from './posts/new-post/new-post';
import { Login } from './auth/login/login';

export const routes: Routes = [
    {path:'', component: Dashboard},
    {path:'categories', component: Categories},
    {path:'posts', component:AllPost},
    {path:'posts/new', component:NewPost},
    {path:'login', component:Login}
];
