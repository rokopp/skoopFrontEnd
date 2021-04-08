import { ActiveRoom } from './../../activeroom';
import { ActiveRoomsService } from './../../services/active-rooms.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-show-activated-room',
  templateUrl: './show-activated-room.component.html',
  styleUrls: ['./show-activated-room.component.css']
})
export class ShowActivatedRoomComponent implements OnInit {
  currentId;
  joinCode = '';
  constructor(private activatedRoute: ActivatedRoute,
              private _location: Location,
              private activeRoomSerivce: ActiveRoomsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.currentId = +params.activeroom;
        this.activeRoomSerivce.getActiveGameById(this.currentId).subscribe(room => {
          this.joinCode = room.joinCode;
        })
      });
  }
  deleteGame(): void{
    this.activeRoomSerivce.deleteActiveGameById(this.currentId).subscribe(response => {
      this.joinCode = '';
      this.backClicked();
    }
    );
  }
  backClicked(): void{
    this._location.back();
  }

}
