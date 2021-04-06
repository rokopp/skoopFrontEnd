import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {QuestionService} from '../../services/question.service';
import {MatTable} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {Question} from '../../question';
import {Subscription} from 'rxjs';

export interface Answer {
  text: string;
}

@Component({
  selector: 'app-question-set',
  templateUrl: './question-set.component.html',
  styleUrls: ['./question-set.component.css']
})
export class QuestionSetComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<Question>;
  updateInsteadOfPost = false;
  editId = null;
  columnsToDisplay = ['id', 'question', 'answer', 'type', 'action'];
  questionSet: Array<{}> = [];  // Array of objects
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  choices: Answer[] = [];
  setId: number;
  setName: string;
  private subscriptions: Subscription[] = [];
  selectCorrectAnswerNr: Answer[] = [];

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    // Get pathvariables question Set id and name.
    const sub = this.route.paramMap.subscribe(params => {
      this.setId = +params.get('id');
      this.setName = params.get('name');
    });
    this.subscriptions.push(sub);
    this.getQuestions();
  }
  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  // Add choices under question.
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

  // Remove one choice from question.
  remove(answer: Answer): void {
    const index = this.choices.indexOf(answer);
    if (index >= 0) {
      this.choices.splice(index, 1);
    }
  }

  // Returns a question put together from input values.
  createQuestion(): Question {
    const questionval = this.getInputValueById('question');
    const answerval = this.getInputValueById('answer');
    const pointsval = this.getInputValueById('points');
    const choices1 = [];
    this.choices.forEach(choice => choices1.push(choice.text));
    return {
      questionSetId: this.setId,
      questionText: questionval,
      answer: answerval,
      pointsTrue: +pointsval,
      pointsFalse: 0,
      hint: 'your mom',
      id: null,
      choices: choices1
    };
  }

  // Add a new question to database, reload the page.
  addQuestion(): void {
    const questionObj = this.createQuestion();
    const sub = this.questionService.postQuestion(questionObj).subscribe(() => {
      this.getQuestions();
    });
    this.subscriptions.push(sub);
    this.updateInsteadOfPost = false;
    this.editId = null;
  }

  // Empty matchipinput choices in reset form.
  emptyChoices(): void {
    this.choices = [];
    this.updateInsteadOfPost = false;
    this.editId = null;
  }

  // Simple helper function
  private getInputValueById(id: string): string {
    return (document.getElementById(id) as HTMLInputElement).value;
  }

  // Get all questions for this question set, meant for table.
  private getQuestions(): void {
    const sub = this.questionService.getQuestions(this.setId)
      .subscribe(questions => this.questionSet = questions.sort((q1, q2) => q1.id - q2.id));
    this.subscriptions.push(sub);
  }

  // Remove a question completely from database.
  public deleteQuestion(element: Question): void {
    const sub = this.questionService.removeQuestion(element)
      .subscribe(() => this.getQuestions());
    this.subscriptions.push(sub);
  }

  // Change question field values.
  editQuestion(element: Question): void {
    (document.getElementById('question') as HTMLInputElement).value = element.questionText;
    (document.getElementById('points') as HTMLInputElement).value = String(element.pointsTrue);
    (document.getElementById('answer') as HTMLInputElement).value = element.answer;
    this.choices = [];
    element.choices.forEach(choice => {
      const choiceAnswer = {text: choice};
      this.choices.push(choiceAnswer); }
    );
    this.updateInsteadOfPost = true;
    this.editId = element.id;
  }

  // Update question selected for edit, otherwise submits new question.
  updateQuestion(element: Question): void {
    const questionObj = this.createQuestion();
    questionObj.id = element.id;
    this.updateInsteadOfPost = false;
    this.editId = null;
    const sub = this.questionService.putQuestion(questionObj).subscribe(() => {
        this.getQuestions();
      },
      error => console.error(error));
    this.subscriptions.push(sub);
  }

  selectCorrectAnswer(id: number, element: Answer): void {
    const selectedElement = document.getElementById('choice_' + id);
    if (selectedElement.getAttribute('isSelected') === 'false') {
      if (this.selectCorrectAnswerNr.length > 0) {
        this.selectCorrectAnswerNr = [];
      }
      selectedElement.setAttribute('isSelected', 'true');
      this.selectCorrectAnswerNr.push(element);
    } else {
      this.selectCorrectAnswerNr.forEach((element2, index) => {
        if (element2 === element) { this.selectCorrectAnswerNr.splice(index, 1); }
      });
      selectedElement.setAttribute('isSelected', 'false');
    }
    console.log(this.selectCorrectAnswerNr.length);
    if (this.selectCorrectAnswerNr.length === 0) {
      (document.getElementById('answer') as HTMLInputElement).value = '';
    }
    this.selectCorrectAnswerNr.forEach((answer) => {
      console.log(answer.text);
      (document.getElementById('answer') as HTMLInputElement).value = answer.text;
    });
  }

  setBg(id: number): string {
    const selectedElement = document.getElementById('choice_' + id);
    if (selectedElement.getAttribute('isSelected') === 'true') {
      return 'selectedCorrectAnswer';
    }
    return '';
  }
}
