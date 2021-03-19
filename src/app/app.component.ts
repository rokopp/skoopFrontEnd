import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivationEnd, Router, RouterEvent} from '@angular/router';
import {LoadingScreenService} from './services/loading-screen.service';
import {Subscription} from 'rxjs';
import {LoaderState} from './loader';
import {NavbarService} from "./services/navbar.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private getComponent: string;
  show = false;
  private subscription: Subscription;

  setBgImg(): string {
    if (this.getComponent === 'GreetingComponent') {
      return 'greetingPage';
    } else if (this.getComponent === 'GoPlayRoomsComponent' || this.getComponent === 'RoomComponent') {
      return 'goPlayRoomsPage';
    } else if (this.getComponent === 'QuestionsanswersComponent') {
      return 'questionsanswersPage';
    } else if (this.getComponent === 'ContactComponent') {
      return 'contactPage';
    } else if (this.getComponent === 'QuestionSetComponent') {
      return 'questionSetPage';
    } else {
      return 'greetingPage';
    }
  }

  constructor(private router: Router, private loadingScreenService: LoadingScreenService,
              private changeDetectorRef: ChangeDetectorRef, public nav: NavbarService
  ) {
    router.events.subscribe((val: RouterEvent) => {
      if (val instanceof ActivationEnd) {
        if (typeof val.snapshot.component !== 'string') {
          this.getComponent = val.snapshot.component.name;
        }
        this.setBgImg();
      }
    });
  }
  ngOnInit(): void {
    this.subscription = this.loadingScreenService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        this.changeDetectorRef.detectChanges();
      });
    this.nav.show();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  splashScreenGreetingPage(): boolean {
    return this.getComponent === 'GreetingComponent';
  }

}
