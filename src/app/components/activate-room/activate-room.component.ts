import { ActiveRoom } from './../../activeroom';
import { ActiveRoomsService } from './../../services/active-rooms.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate-room',
  templateUrl: './activate-room.component.html',
  styleUrls: ['./activate-room.component.css']
})

export class ActivateRoomComponent implements OnInit {
  currentId;
  joinCode;
  activated = false;

  constructor(private activatedRoute: ActivatedRoute,
              private activeRoomSerivce: ActiveRoomsService
    ) {
    this.activatedRoute.parent.params.subscribe(
      (params) => {
        this.currentId = +params.id;
      });
  }

  ngOnInit(): void {
    this.getJoinCode();
  }
  getJoinCode(): void{
    this.activeRoomSerivce.getActiveGameById(this.currentId).subscribe(activeRoom => {
      this.joinCode = activeRoom.joinCode;
      if (this.joinCode){
        this.activated = true;
      }else{
        this.activated = false;
      }
    });
  }

  deleteGame(): void{
    this.activeRoomSerivce.deleteActiveGameById(this.currentId).subscribe(response => {
      this.activated = false;
      this.joinCode = '';
    }
    );
  }
  activateGame(name: string): void{
    if (name){
      const activeGameObj = {
        roomId: this.currentId,
        roomName: name
      };
      this.activeRoomSerivce.activeGame(activeGameObj).subscribe(response => {
        this.joinCode = response.joinCode;
        this.activated = true;
      })
    }
  }

}
