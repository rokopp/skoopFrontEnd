import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-new-room',
  templateUrl: './create-new-room.component.html',
  styleUrls: ['./create-new-room.component.css']
})
export class CreateNewRoomComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
