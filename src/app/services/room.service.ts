import { Room } from './../room';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomsUrl = 'api/pairs';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl);
  }
  getRoombyId(id: number): Observable<Room> {
    return this.http.get<Room>(this.roomsUrl + '/' + id);
  }
  getRoomIdByName(name: string): Observable<Number> {
    return this.http.get<Number>(this.roomsUrl + '/name/' + name);
  }
  getRoomsByCreatorId(id: string): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl + '/creator/' + id);
  }
  postRoom(roomobj: { creatorAccountId: number; date: string;
    firstView: string; gameName: string; password: string}): Observable<Room> {
      return this.http.post<Room>(this.roomsUrl, roomobj, {});
    }

}
