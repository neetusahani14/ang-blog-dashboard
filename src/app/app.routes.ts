import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Categories } from './categories/categories';

export const routes: Routes = [
    {path:'', component: Dashboard},
    {path:'categories', component: Categories}
];
