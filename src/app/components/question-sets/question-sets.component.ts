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
  data: Questionset[] = [];
  creatorId = 1;
  // TODO: get questionsets of certain person
  // TODO: get user id
  constructor(private questionSetsService: QuestionsetsService) {
  }

  ngOnInit(): void {
    this.getSets();
  }

  getSets(): void {
    this.questionSetsService.getQuestionSets().subscribe(sets => this.data = sets);
  }
  addSet(): void {
    const setName = (document.getElementById('input') as HTMLInputElement).value;
    this.questionSetsService.addQuestionSet({name: setName, creatorAccountId: this.creatorId} as Questionset)
      .subscribe({
        error: error => {
          const errorMessage = error.message;
          console.error('Happened this during posting: ', errorMessage);
        }
      });
    window.location.reload();
  }

  removeSet(id: number): void {
    this.questionSetsService.removeSet(id).subscribe({
      error: error => {
        const errorMessage = error.message;
        console.error('Happened this during deleting: ', errorMessage);
      }
    });
    window.location.reload();
  }
}
