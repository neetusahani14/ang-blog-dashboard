import { Component } from '@angular/core';
import { Authentication } from '../../services/authentication';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  userEmail: string = '';
  isLoggedIn$!: Observable<boolean>;
  constructor(private auth: Authentication) {}

  ngOnInit(): void {

    this.userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
    this.isLoggedIn$ = this.auth.isLoggedIn();
  }


  onLogout() {
    this.auth.logOut();
  }

}
