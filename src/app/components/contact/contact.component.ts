import { Component, OnInit } from '@angular/core';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../../app.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public bgService: BackgroundImageChangeService) { }

  ngOnInit(): void {
  }

}
