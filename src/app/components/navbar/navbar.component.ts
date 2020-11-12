import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }
  loginStatus() {
    const user = this.authenticationService.userValue;
    return !!user;
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit(): void {
  }

}
