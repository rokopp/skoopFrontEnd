import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Questionset} from '../../questionset';
import {QuestionsetsService} from '../../services/questionsets.service';

@Component({
  selector: 'app-question-sets',
  templateUrl: './question-sets.component.html',
  styleUrls: ['./question-sets.component.css']
})
export class QuestionSetsComponent implements OnInit {
  data: any;
  // TODO: get questionsets of certain person
  constructor(private questionSetsService: QuestionsetsService) {
  }

  ngOnInit(): void {
  }

  getSets(): void {
    this.questionSetsService.getQuestionSets().subscribe()
  }
  addSet(): void {
  }

  removeSet(set: any): void {
  }
}
