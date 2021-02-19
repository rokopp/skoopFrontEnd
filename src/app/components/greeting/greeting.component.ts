import { Component, OnInit } from '@angular/core';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css', '../../app.component.css']
})
export class GreetingComponent implements OnInit {

  constructor(public bgService: BackgroundImageChangeService) { }

  ngOnInit(): void {
  }
}
