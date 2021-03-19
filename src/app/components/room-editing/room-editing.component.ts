import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-room-editing',
  templateUrl: './room-editing.component.html',
  styleUrls: ['./room-editing.component.css']
})
export class RoomEditingComponent implements OnInit {

  mini = true;
  currentRoomId: number;
  constructor(public router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoomId = this.activatedRoute.snapshot.params.id;
  }

  toggleSidebar(): void {
    if (this.mini) {
      document.getElementById('mySidebar').style.width = '250px';
      document.getElementById('main').style.marginLeft = '250px';
      this.mini = false;
    } else {
      document.getElementById('mySidebar').style.width = '85px';
      document.getElementById('main').style.marginLeft = '85px';
      this.mini = true;
    }
  }

}
