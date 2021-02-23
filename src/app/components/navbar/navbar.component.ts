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

  async getProfile() {
    const graphMeEndpoint = 'https://graph.microsoft.com/v1.0/me';

    // @ts-ignore
    const account = this.msalService.getAccount();
    if (account !== null) {
      this.name = account.name;
      this.username = account.userName;
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    this.http.get(graphMeEndpoint).toPromise()
      .then(profile => {
        console.log(profile);
      });

  }

  signOut(): void {
    this.authenticated = false;
    this.msalService.logout();
  }

  login(): void {
    this.msalService.loginRedirect();
  }
}
