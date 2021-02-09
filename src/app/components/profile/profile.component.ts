import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MsalService} from "@azure/msal-angular";

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile;

  constructor(private http: HttpClient, private authService: MsalService) { }

  ngOnInit(): void {
    this.getProfile();
    this.authService.acquireTokenPopup({scopes: ['user.read']});
  }

  getProfile(): void {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }
}
