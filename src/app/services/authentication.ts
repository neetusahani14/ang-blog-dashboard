import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class Authentication {
  constructor(private auth: Auth, private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(logRef => {
        this.toastr.success('Login successful!');
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.toastr.warning(err.message);
      });
  }
}
