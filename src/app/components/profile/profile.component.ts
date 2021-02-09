import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }
}
