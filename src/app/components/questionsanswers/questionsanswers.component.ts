import { Component, HostListener, OnInit } from '@angular/core';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';

@Component({
  selector: 'app-questionsanswers',
  templateUrl: './questionsanswers.component.html',
  styleUrls: ['./questionsanswers.component.css', '../../app.component.css']
})
export class QuestionsanswersComponent implements OnInit {

  constructor(public bgService: BackgroundImageChangeService) { }

  public innerWidth: any;
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
  }

  setClassNames(): string {
    if (this.innerWidth < 990) {
      return 'col-10 ml-3 mt-3';
    }
    return 'col-12 mt-5';
  }
}
