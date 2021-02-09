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


  ngOnInit(): void {
    // @ts-ignore
    const account = this.msalService.getAccount();
    this.name = account.name;
    this.username = account.userName;
  }

  signOut(): void {
    this.msalService.logout();
  }


}
