import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BroadcastService, MsalService} from '@azure/msal-angular';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarToggler') navbarToggler: ElementRef;

  // constructor(private http: HttpClient, private msalService: MsalService, private broadcastService: BroadcastService) {
  // }
  name: string;
  username: string;
  authenticated: boolean;


  ngOnInit(): void {
   // this.getProfile();
   // this.broadcastService.subscribe('msal:loginSuccess', (success) => {
   //    this.getProfile();
   //  });
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
    // this.authenticated = false;
    // this.msalService.logout();
  }

  // async login(): Promise<void> {
  //   this.msalService.loginPopup();
  // }

  navBarTogglerIsVisible(): boolean {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav(): void {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }
}
