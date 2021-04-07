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
  activeRooms: ActiveRoom[] = [];
  deleteRoom: ActiveRoom;
  roomName = '';
  curPage: number;
  pageSize: number;


  constructor(private activatedRoute: ActivatedRoute,
              private activeRoomSerivce: ActiveRoomsService
    ) {
    this.activatedRoute.parent.params.subscribe(
      (params) => {
        this.currentId = +params.id;
      });
  }

  ngOnInit(): void {
    this.getActiveRooms();
    this.curPage = 1;
    this.pageSize = 7;
  }

  getActiveRooms(): void{
    this.activeRoomSerivce.getActiveGamesByRoomId(this.currentId).subscribe(activeRoom => {
      this.activeRooms = activeRoom;
    });
  }
  numberOfPages(): number {
    return Math.ceil(this.activeRooms.length / this.pageSize);
  }
  removeRoom(set: ActiveRoom): void{
    this.activeRoomSerivce.deleteActiveGameById(set.id).subscribe(() => {
      this.getActiveRooms();
      window.location.reload();
    },
      error => {
        const errorMessage = error.message;
        console.error('Happened this during deleting: ', errorMessage);
    });
  }

  activateNewRoom(): void {
    const roomName = (document.getElementById('input') as HTMLInputElement).value;
    const activeGameObj = {
      roomId: this.currentId,
      roomName: roomName
    };
    this.activeRoomSerivce.activeGame(activeGameObj).subscribe(response => {
      this.getActiveRooms();
      window.location.reload();
    })
  }
  confirmDelete(set: ActiveRoom): void {
    this.deleteRoom = set;
  }
}
