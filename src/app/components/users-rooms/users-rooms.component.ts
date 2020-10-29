import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-rooms',
  templateUrl: './users-rooms.component.html',
  styleUrls: ['./users-rooms.component.css']
})
export class UsersRoomsComponent implements OnInit {
  enableEdit = false;
  enableEditIndex = null;
  rooms: Array<any> = [
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

  // tslint:disable-next-line:typedef
  updateList(id: number, property: string, event: any) {
    this.rooms[id][property] = event.target.textContent;
  }

  // tslint:disable-next-line:typedef
  remove(id: any) {
    console.log(this.rooms[id]);
    this.rooms.splice(id, 1);
  }

  // tslint:disable-next-line:typedef
  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
  }
  // tslint:disable-next-line:typedef
  save(id, property: string, event) {
    this.enableEdit = false;
    this.updateList(id, property, event);
  }
  // tslint:disable-next-line:typedef
  addRoom(){
    const room = {name: 'Latvia'};
    this.rooms.push(room);
  }
  constructor() { }

  ngOnInit(): void {
  }

  addQuestions(): void {
    // TODO question service
  }

  addLocations(): void {
    // TODO Location service
  }
}
