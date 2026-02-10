import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Categories } from './categories/categories';
import { AllPost } from './posts/all-post/all-post';
import { NewPost } from './posts/new-post/new-post';
import { Login } from './auth/login/login';
import { authGuard } from './services/auth-guard';
import { Subscribers } from './subscribers/subscribers';

export const routes: Routes = [
    {path:'', component: Dashboard, canActivate: [authGuard]},
    {path:'categories', component: Categories, canActivate: [authGuard]},
    {path:'posts', component:AllPost, canActivate: [authGuard]},
    {path:'posts/new', component:NewPost, canActivate: [authGuard]},
    {path:'login', component:Login},
    {path:'subscribers', component:Subscribers, canActivate: [authGuard]}
];
