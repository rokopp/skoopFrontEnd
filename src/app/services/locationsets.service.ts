import { Locationset } from './../locationset';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsetsService {
  private LocationSetsUrl = 'api/location_sets';
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };

  constructor(private http: HttpClient) { }
  getLocationSets(): Observable<Locationset[]>{
    return this.http.get<Locationset[]>(this.LocationSetsUrl);
  }

  addLocationSet(locationSet: Locationset): Observable<Locationset> {
    return this.http.post<Locationset>(this.LocationSetsUrl,  locationSet);
  }

  removeLocationSet(id: number): Observable<Locationset> {
    return this.http.delete<Locationset>(this.LocationSetsUrl + '/' + id);
  }
}
