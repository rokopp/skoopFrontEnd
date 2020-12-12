import { Location } from './../location';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationsUrl = 'api/locations';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationsUrl + '/all');
  }
  getLocationsbyId(id: number): Observable<Location> {
    return this.http.get<Location>(this.locationsUrl + '/' + id);
  }
  getLocationsBySet(id: number): Observable<Location[]> {
    return this.http.get<Location[]>('api/location_sets/' + id);
  }
  postLocation(locationobj: { locationSetId: number; location: string;
    coverRadius: number}): Observable<Location> {
      return this.http.post<Location>(this.locationsUrl, locationobj, {});
    }
  removeLocation(id: number): Observable<Location>{
    return this.http.delete<Location>(this.locationsUrl + '/' + id);
  }
}
