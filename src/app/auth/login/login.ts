import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../../services/authentication';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private auth:Authentication) {}

  onSubmit(formData: any) {
    this.auth.login(formData.email, formData.password);
  }

}
