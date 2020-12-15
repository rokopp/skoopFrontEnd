import { Room } from './../../room';
import { RoomService } from './../../services/room.service';
import { PairService } from './../../services/pair.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-users-rooms',
  templateUrl: './users-rooms.component.html',
  styleUrls: ['./users-rooms.component.css']
})
export class UsersRoomsComponent implements OnInit {
  data: Array<any>;
  rooms: Room[] = [];
  creatorAccountId = 1; // TODO: Get id from logged-in account
  id = 1;

  constructor(private pairService: PairService, private roomservice: RoomService) {
  }

  ngOnInit(): void {
    this.getRooms();
    console.log(this.rooms);
  }
  getRooms(): void{
    this.roomservice.getRooms().subscribe(room => this.rooms = room);
  }

  removeRoom(set: Room): void{
    this.roomservice.removeRoom(set.id).subscribe(() => {
      this.getRooms;
      window.location.reload();
    },
      error => {
        const errorMessage = error.message;
        console.error('Happened this during deleting: ', errorMessage);
    });
  }
  addRoom(): void {
    const roomName = (document.getElementById('input') as HTMLInputElement).value;
    this.roomservice.postRoom({
      creatorAccountId: this.creatorAccountId,
      date: '12/11/2020 00:00:00',
      firstView: '',
      gameName: roomName,
      gameLength: 0,
      password: ''
    } as Room)
      .subscribe(() => {
        this.getRooms;
        window.location.reload();
      },
        error => {
          const errorMessage = error.message;
          console.error('Happened this during posting: ', errorMessage);
        });
  }
}
