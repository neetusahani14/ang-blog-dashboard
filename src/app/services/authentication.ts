import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Authentication {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(private auth: Auth, private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(logRef => {
        this.toastr.success('Login successful!');
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedInGuard = true;
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.toastr.warning(err.message);
      });
  }

   loadUser() {
    return onAuthStateChanged(this.auth, (user) => {
      // console.log(JSON.parse(JSON.stringify(user)));
      localStorage.setItem('user', JSON.stringify(user)); // Store user data in local storage


    });
  }

  logOut() {  
    this.auth.signOut().then(() => {
      this.toastr.success('Logout successful!');
      this.router.navigate(['/login']);
      localStorage.removeItem('user'); 
      this.loggedIn.next(false);
      this.isLoggedInGuard = false; 
  }).catch((error) => {
      console.error('Error signing out: ', error);
  });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

}
