import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Answer {
  text: string;
}

@Component({
  selector: 'app-question-set',
  templateUrl: './question-set.component.html',
  styleUrls: ['./question-set.component.css']
})
export class QuestionSetComponent implements OnInit {
  columnsToDisplay = ['id', 'question', 'answer'];
  questionSet: Array<{}> = [];  // Array of objects
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  answers: Array<Answer> = [];
  constructor() { }
  ngOnInit(): void {
    this.getQuestions();
  }
  addAnswer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add answer
    if ((value || '').trim()) {
      this.answers.push({text: value.trim()});
    }
    // Reset input value
    if (input) {
      input.value = '';
    }
  }
  remove(answer: Answer): void {
    const index = this.answers.indexOf(answer);
    if (index >= 0) {
      this.answers.splice(index, 1);
    }
  }

  // TODO: replace with data from question API{questionSetID}
  private getQuestions(): void {
    this.questionSet.push({setId: 1, id: 1, question: 'Which Shrek is the best?',
      multiple_choices: ['Shrek 1', 'Shrek 2', 'Shrek 3', 'Shrek 4'], answer: 'Shrek 1', points: 5  });
    this.questionSet.push({setId: 1, id: 2, question: 'What is 2**10?',
      multiple_choices: ['256', '1024', '4096', '2048'], answer: '4096', points: 10  });
  }

  editAnswer(answer: Answer): void {

  }
}
