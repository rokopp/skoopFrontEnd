import { Component, OnInit } from '@angular/core';
import {BackgroundImageChangeService} from "../../services/background-image-change.service";

@Component({
  selector: 'app-go-play-rooms',
  templateUrl: './go-play-rooms.component.html',
  styleUrls: ['./go-play-rooms.component.css', '../../app.component.css']
})
export class GoPlayRoomsComponent implements OnInit {
  teams: Array<any> = [
    {
      name: 'Russia',
    },
    {
      name: 'Canada',
    },
    {
      name: 'United States',
    },
    {
      name: 'China',
    }
  ];
  constructor(public bgService: BackgroundImageChangeService) { }

  ngOnInit(): void {
  }

}
