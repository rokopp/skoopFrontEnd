import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MsalService} from '@azure/msal-angular';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
