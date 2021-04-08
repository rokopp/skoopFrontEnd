import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question, QuestionCheckBox} from '../question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionsUrl = 'api/questions/';
  private questionTypeUrl: string;
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

  // TODO add question type by url
  postQuestion(questionObj: Question, questionType: string): Observable<Question> {
    this.setUrl(questionType);
    return this.http.post<Question>(this.questionsUrl + this.questionTypeUrl, questionObj, {});
  }

  postQuestionCheckBox(questionObj: QuestionCheckBox, questionType: string): Observable<Question> {
    this.setUrl(questionType);
    return this.http.post<Question>(this.questionsUrl + this.questionTypeUrl, questionObj, {});
  }

  putQuestion(questionObj: Question): Observable<Question> {
    return this.http.put<Question>(this.questionsUrl, questionObj, {});
  }

  removeQuestion(element: Question): Observable<any> {
    return this.http.delete(this.questionsUrl + '/' + element.id);
  }

  setUrl(questionType: string): void {
    if (questionType === 'MultipleChoices') {
      this.questionTypeUrl = 'multiple';
    }
    if (questionType === 'Checkbox') {
      this.questionTypeUrl = 'checkbox';
    }
    if (questionType === 'Text') {
      this.questionTypeUrl = 'text';
    }
  }
}
