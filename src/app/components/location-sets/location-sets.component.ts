import { Locationset } from '../../locationset';
import { LocationsetsService } from '../../services/locationsets.service';
import { Component, OnInit } from '@angular/core';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';

@Component({
  selector: 'app-location-sets',
  templateUrl: './location-sets.component.html',
  styleUrls: ['./location-sets.component.css', '../../app.component.css']
})
// TODO: Refresh page after succesful post and delete.
export class LocationSetsComponent implements OnInit {
  data: Array<any>;
  locationSets: Locationset[] = [];
  creatorAccountId = 1; // TODO: Get id from logged-in account
  id = 1;

  constructor(private locationSetsService: LocationsetsService, public bgService: BackgroundImageChangeService) {
  }

  ngOnInit(): void {
    this.getLocationSets();
  }
  getLocationSets(): void{
    this.locationSetsService.getLocationSets().subscribe(locationSets => this.locationSets = locationSets);
  }

  removeLocationSet(set: Locationset): void{
    this.locationSetsService.removeLocationSet(set.id).subscribe(() => {
      this.getLocationSets();
      window.location.reload(); },
      error => {
        const errorMessage = error.message;
        console.error('Happened this during deleting: ', errorMessage);
    });
  }
  addLocationSet(): void{
    const locationSetName = (document.getElementById('input') as HTMLInputElement).value;
    this.locationSetsService.addLocationSet({name: locationSetName, creatorAccountId: this.creatorAccountId} as Locationset)
      .subscribe(() => {
        this.getLocationSets();
        window.location.reload(); },
        error => {
          const errorMessage = error.message;
          console.error('Happened this during posting: ', errorMessage);
        });
  }
}
