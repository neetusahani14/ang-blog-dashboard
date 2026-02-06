import { CanActivateFn, Router } from '@angular/router';
import { Authentication } from './authentication';
import { inject } from '@angular/core/primitives/di';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

const auth:any = inject(Authentication);
const router:any = inject(Router);
const toastr:any = inject(ToastrService);

if (auth.isLoggedInGuard) {
  console.log('Access Granted..');
  return true;
}
else {
  toastr.warning('Please login to access this page.');
  router.navigate(['/login']);
  return false;
}
};
