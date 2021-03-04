import { Component, OnInit } from '@angular/core';
import {LoadingScreenService} from '../../services/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {
// The screen starts with the maximum opacity
  public opacityChange = 1;
  public splashTransition;
// First access the splash is visible
  public showSplash = true;
  readonly ANIMATION_DURATION = 1;

  private hideSplashAnimation(): void {
    // Setting the transition
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
    setTimeout(() => {
      // After the transition is ended the showSplash will be hided
      this.showSplash = !this.showSplash;
    }, 1000);
  }
  constructor(private loadingScreenService: LoadingScreenService) { }

  ngOnInit(): void {
    this.loadingScreenService.subscribe(res => {
      this.hideSplashAnimation();
    });
  }
}
