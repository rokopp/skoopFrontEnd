import {Component, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {QuestionService} from '../../services/question.service';
import {MatTable} from '@angular/material/table';

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
  choices: Array<Answer> = [];
  constructor(private questionService: QuestionService) { }
  ngOnInit(): void {
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
    const questionObj = {
      questionSetId: 1,
      question: questionval,
      answer: answerval,
      points: pointsval
    };
    this.questionService.postQuestion(questionObj).subscribe(this.table.renderRows);
  }
  private getQuestions(): void {
    this.questionService.getQuestions()
      .subscribe(questions => this.questionSet = questions);
  }
  emptyChoices(): void {
    this.choices = [];
  }
  private getInputValueById(id: string): string {
    return (document.getElementById(id) as HTMLInputElement).value;
  }
}
