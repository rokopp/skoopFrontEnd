import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Questionset} from '../../questionset';
import {QuestionsetsService} from '../../services/questionsets.service';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';

@Component({
  selector: 'app-question-sets',
  templateUrl: './question-sets.component.html',
  styleUrls: ['./question-sets.component.css', '../../app.component.css']
})
export class QuestionSetsComponent implements OnInit, OnDestroy {
  data: Questionset[];
  creatorId = 1;
  private subscriptions: Subscription[] = [];

  constructor(private questionSetsService: QuestionsetsService, public bgService: BackgroundImageChangeService) {
  }

  ngOnInit(): void {
    this.getSets();
  }
  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  getSets(): void {
    const sub = this.questionSetsService.getQuestionSets().subscribe(response => {
      this.data = response;
    }, err =>
    alert(err));
    this.subscriptions.push(sub);
  }

  addSet(): void {
    const setName = (document.getElementById('input') as HTMLInputElement).value;
    const sub = this.questionSetsService.addQuestionSet({name: setName, creatorAccountId: this.creatorId} as Questionset)
      .subscribe(() => this.getSets());
    this.subscriptions.push(sub);
  }

  removeSet(id: number): void {
    const sub = this.questionSetsService.removeSet(id)
      .subscribe(() => {
        this.getSets();
      },
      error => {
        const errorMessage = error.message;
        console.error('Happened this during deleting: ', errorMessage);
    });
    this.subscriptions.push(sub);
  }
}
