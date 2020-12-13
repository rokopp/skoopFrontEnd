import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionsUrl = 'api/questions';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }

  getQuestions(setId: number): Observable<Question[]> {
    return this.http.get<Question[]>('api/question_sets/' + setId);
  }
  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(this.questionsUrl + '/' + id);
  }

  postQuestion(questionObj: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, questionObj, {});
  }

  putQuestion(questionObj: Question): Observable<Question> {
    return this.http.put<Question>(this.questionsUrl, questionObj, {});
  }

  removeQuestion(element: Question): Observable<any> {
    return this.http.delete(this.questionsUrl + '/' + element.id);
  }
}
