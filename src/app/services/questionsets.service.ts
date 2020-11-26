import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Questionset} from '../questionset';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsetsService {
  private questionSetsUrl = 'api/question_sets';
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };
  constructor(private http: HttpClient) { }
  getQuestionSets(): Observable<Questionset[]>{
    return this.http.get<Questionset[]>(this.questionSetsUrl);
  }

  addQuestionSet(questionSet: Questionset): Observable<Questionset> {
    return this.http.post<Questionset>(this.questionSetsUrl,  questionSet);
  }

  removeSet(id: number): Observable<Questionset> {
    return this.http.delete<Questionset>(this.questionSetsUrl + '/' + id);
  }
}
