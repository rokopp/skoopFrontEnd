import { Component, OnInit } from '@angular/core';
import {MsalService} from '@azure/msal-angular';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  name: string;
  username: string;

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
    // @ts-ignore
    const account = this.msalService.getAccount();
    this.name = account.name;
    this.username = account.userName;
  }

}
