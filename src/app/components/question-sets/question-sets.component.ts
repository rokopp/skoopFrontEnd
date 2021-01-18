import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Questionset} from '../../questionset';
import {QuestionsetsService} from '../../services/questionsets.service';

@Component({
  selector: 'app-question-sets',
  templateUrl: './question-sets.component.html',
  styleUrls: ['./question-sets.component.css']
})
export class QuestionSetsComponent implements OnInit, OnDestroy {
  data: Questionset[];
  private questionSetsSubscription: Subscription;
  creatorId = 1;

  constructor(private questionSetsService: QuestionsetsService) {
  }

  ngOnInit(): void {
    this.getSets();
  }
  ngOnDestroy(): void {
    this.questionSetsSubscription.unsubscribe();
  }

  getSets(): void {
    this.questionSetsSubscription = this.questionSetsService.getQuestionSets().subscribe(response => {
      this.data = response;
    }, err =>
    alert(err));
  }

  addSet(): void {
    const setName = (document.getElementById('input') as HTMLInputElement).value;
    this.questionSetsService.addQuestionSet({name: setName, creatorAccountId: this.creatorId} as Questionset)
      .subscribe(() => {
        this.getSets();
        },
        error => {
          const errorMessage = error.message;
          console.error('Happened this during posting: ', errorMessage);
      });
  }

  removeSet(id: number): void {
    this.questionSetsService.removeSet(id)
      .subscribe(() => {
        this.getSets();
      },
      error => {
        const errorMessage = error.message;
        console.error('Happened this during deleting: ', errorMessage);
    });
  }
}
