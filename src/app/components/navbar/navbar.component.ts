import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {HttpClient} from "@angular/common/http";
// import { AuthService } from '../_services/auth.service';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  profile;

  // // Is a user logged in?
  // get authenticated(): boolean {
  //   return this.authService.authenticated;
  // }
  // // The user
  // get user(): User {
  //   return this.authService.user;
  // }
  //
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getProfile(): void {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  // async signIn(): Promise<void> {
  //   await this.authService.signIn();
  // }
  //
  // signOut(): void {
  //   this.authService.signOut();
  // }

}
