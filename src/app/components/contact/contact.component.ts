import {Component, HostListener, OnInit} from '@angular/core';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../../app.component.css']
})
export class ContactComponent implements OnInit {

  public innerWidth: any;
  constructor(public bgService: BackgroundImageChangeService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = window.innerWidth;
  }

  setClassNames(): string {
    if (this.innerWidth < 990) {
      return 'col-10 ml-3 mt-3';
    }
    return 'col-12 ml-5 mt-5';
  }

}
