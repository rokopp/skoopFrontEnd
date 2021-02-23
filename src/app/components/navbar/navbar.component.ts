import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private http: HttpClient, private msalService: MsalService) {
  }
  name: string;
  username: string;
  authenticated: boolean;


  ngOnInit(): void {
   this.getProfile();
  }

  getProfile(): void {
    // @ts-ignore
    const account = this.msalService.getAccount();
    if (account !== null) {
      this.name = account.name;
      this.username = account.userName;
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  signOut(): void {
    this.authenticated = false;
    this.msalService.logout();
  }

  login(): void {
    this.msalService.loginRedirect();
  }
}
