import { Component, OnInit } from '@angular/core';
import {BroadcastService, MsalService} from '@azure/msal-angular';
import {Router} from '@angular/router';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  name: string;
  username: string;

  constructor(private msalService: MsalService, private broadcastService: BroadcastService, private router: Router) { }

  ngOnInit(): void {
    this.getProfile();
    this.broadcastService.subscribe('msal:loginSuccess', (success) => {
      this.router.navigate(['/avaleht']);
      console.log('Did it work');
    });
  }

  getProfile(): void {
    // @ts-ignore
    const account = this.msalService.getAccount();
    if (account !== null) {
      this.name = account.name;
      this.username = account.userName;
    }
  }
}
