import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  bgImage: string;
  private getComponent: string;

  setBgImg() {
    if (this.getComponent === 'GreetingComponent') {
      this.bgImage = '../assets/front_page.jpg';
    } else if (this.getComponent === 'GoPlayRoomsComponent' || this.getComponent === 'RoomComponent') {
      this.bgImage = '../assets/hiking-facebook-cover.jpg';
    } else if (this.getComponent === 'QuestionsanswersComponent') {
      this.bgImage = '../assets/KKK_picture.png';
    } else if (this.getComponent === 'ContactComponent') {
      this.bgImage = '../assets/contact_page.jpg';
    } else {
      this.bgImage = '../assets/front_page.jpg';
    }
  }

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        this.getComponent = val.snapshot.component['name'];
        this.setBgImg();
      }
    });
  }
  ngOnInit(): void {
  }
}
