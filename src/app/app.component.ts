import {Component, OnInit} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private getComponent: string;

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

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        if (typeof val.snapshot.component !== 'string') {
          this.getComponent = val.snapshot.component.name;
        }
        this.setBgImg();
      }
    });
  }
  ngOnInit(): void {
  }

}
