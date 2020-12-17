import { Pair } from '../pair';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PairService {
  private pairsUrl = 'api/pairs';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}
  getPairs(): Observable<Pair[]> {
    return this.http.get<Pair[]>(this.pairsUrl);
  }
  getPairbyId(id: number): Observable<Pair> {
    return this.http.get<Pair>(this.pairsUrl + '/' + id);
  }
  removePair(id: number): Observable<Pair> {
    return this.http.delete<Pair>(this.pairsUrl + '/' + id);
  }
  postPair(pairobj: { locationId: number; questionId: number;
    roomId: number}): Observable<Pair> {
      return this.http.post<Pair>(this.pairsUrl, pairobj, {});
    }
}
