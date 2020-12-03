import {Component, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {QuestionService} from '../../services/question.service';
import {MatTable} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

export interface Answer {
  text: string;
}

@Component({
  selector: 'app-question-set',
  templateUrl: './question-set.component.html',
  styleUrls: ['./question-set.component.css']
})
export class QuestionSetComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  columnsToDisplay = ['id', 'question', 'answer'];
  questionSet: Array<{}> = [];  // Array of objects
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  choices: Answer[] = [];
  setId: number;
  constructor(private questionService: QuestionService,
              private route: ActivatedRoute ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.setId = +params.get('id');
    });
    this.getQuestions();
  }
  addAnswer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add answer
    if ((value || '').trim()) {
      this.choices.push({text: value.trim()});
    }
    // Reset input value
    if (input) {
      input.value = '';
    }
  }
  remove(answer: Answer): void {
    const index = this.choices.indexOf(answer);
    if (index >= 0) {
      this.choices.splice(index, 1);
    }
  }
  addQuestion(): void {
    const questionval = this.getInputValueById('question');
    const answerval = this.getInputValueById('answer');
    const pointsval = this.getInputValueById('points');
    const choices1 = [];
    this.choices.forEach(choice => choices1.push(choice.text));
    const questionObj = {
      questionSetId: this.setId,
      question: questionval,
      answer: answerval,
      points: +pointsval,
      id: null,
      choices: choices1
    };
    console.error(questionObj);
    this.questionService.postQuestion(questionObj).subscribe(quest => this.table.renderRows());
    window.document.location.reload();
  }
  private getQuestions(): void {
    this.questionService.getQuestions(this.setId)
      .subscribe(questions => this.questionSet = questions);
  }
  emptyChoices(): void {
    this.choices = [];
  }
  private getInputValueById(id: string): string {
    return (document.getElementById(id) as HTMLInputElement).value;
  }
}
