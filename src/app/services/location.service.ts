import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '../location';

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
  postLocation(locationobj: { locationSetId: number; location: string;
    coverRadius: number}): Observable<Location> {
      return this.http.post<Location>(this.locationsUrl, locationobj, {});
    }
}
