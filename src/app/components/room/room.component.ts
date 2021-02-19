import { Component, OnInit } from '@angular/core';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css', '../../app.component.css']
})
export class RoomComponent implements OnInit {

  constructor(public bgService: BackgroundImageChangeService) { }

  ngOnInit(): void {
  }

}
