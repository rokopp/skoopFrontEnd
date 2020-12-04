import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {AuthService} from '../../auth.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  // Is a user logged in?
  get authenticated(): boolean {
    return this.authService.authenticated;
  }
  // The user
  get user(): User {
    return this.authService.user;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async signIn(): Promise<void> {
    await this.authService.signIn();
  }
}
