import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from '@angular/router';
// @ts-ignore
import { MsalService, MsalBroadcastService, MsalGuardConfiguration, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import {Subject} from 'rxjs';
import { AuthenticationResult, InteractionType, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import {filter, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy  {
  bgImage: string;
  private getComponent: string;
  isIframe = false;
  loginDisplay = false;
  // tslint:disable-next-line:variable-name
  private readonly _destroying$ = new Subject<void>();

  setBgImg(): void {
    if (this.getComponent === 'GreetingComponent') {
      this.bgImage = '../assets/front_page.jpg';
    } else if (this.getComponent === 'GoPlayRoomsComponent' || this.getComponent === 'RoomComponent') {
      this.bgImage = '../assets/hiking-facebook-cover.jpg';
    } else if (this.getComponent === 'QuestionsanswersComponent') {
      this.bgImage = '../assets/KKK_picture.png';
    } else if (this.getComponent === 'ContactComponent') {
      this.bgImage = '../assets/contact_page.jpg';
    } else if (this.getComponent === 'QuestionSetComponent') {
      this.bgImage = '../assets/questions.jpg';
    } else {
      this.bgImage = '../assets/front_page.jpg';
    }
  }

  constructor(private router: Router,
              @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private authService: MsalService,
              private msalBroadcastService: MsalBroadcastService) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        this.getComponent = val.snapshot.component['name'];
        this.setBgImg();
      }
    });
  }
  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }
  setLoginDisplay(): void {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  login(): void {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(null);
    this._destroying$.complete();
  }
}
