import { ActiveRoom } from './../activeroom';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveRoomsService {
  private activeRoomsUrl = 'api/active';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }

  getAllActiveGames(): Observable<ActiveRoom[]> {
    return this.http.get<ActiveRoom[]>(this.activeRoomsUrl);
  }
  deleteAllActiveGames(): Observable<any> {
    return this.http.delete(this.activeRoomsUrl);
  }
  getActiveGameById(roomId: number): Observable<ActiveRoom> {
    return this.http.get<ActiveRoom>(this.activeRoomsUrl + '/' + roomId);
  }
  activeGame(activegameobj): Observable<ActiveRoom> {
    return this.http.post<ActiveRoom>(this.activeRoomsUrl, activegameobj, {});
  }
  deleteActiveGameById(roomId: number): Observable<any> {
    return this.http.delete(this.activeRoomsUrl + '/' + roomId);
  }
  getActiveGameByRoomCode(roomCode: string): Observable<ActiveRoom> {
    return this.http.get<ActiveRoom>(this.activeRoomsUrl + '/code/' + roomCode);
  }
}
