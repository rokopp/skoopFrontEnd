import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-sets',
  templateUrl: './location-sets.component.html',
  styleUrls: ['./location-sets.component.css']
})
export class LocationSetsComponent implements OnInit {
  data: Array<any>;
  id = 1;

  constructor() {
    this.data = [
      {name: 'Taltech', id: '0'},
      {name: 'Gorod Narva ☺', id: '1'}
    ];
    this.id = this.data.length;
  }

  ngOnInit(): void {
  }
  addLocation(): void{
    const locationName = (document.getElementById('input') as HTMLInputElement).value;
    if (locationName !== ''){
      const room = { name: locationName, id: this.id};
      this.data.push(room);
      this.id++;
    }else {
      alert('Please enter a name');
    }
  }
  removeLocation(id: any): void{
    this.data.splice(id, 1);
  }

}
