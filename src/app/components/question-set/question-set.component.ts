import {Component, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {QuestionService} from '../../services/question.service';
import {MatTable} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {Question} from '../../question';

export interface Answer {
  text: string;
}

@Component({
  selector: 'app-question-set',
  templateUrl: './question-set.component.html',
  styleUrls: ['./question-set.component.css']
})
export class QuestionSetComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<Question>;
  updateInsteadOfPost = false;
  editId = null;
  columnsToDisplay = ['id', 'question', 'answer', 'action'];
  questionSet: Array<{}> = [];  // Array of objects
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  choices: Answer[] = [];
  setId: number;
  setName: string;
  constructor(private questionService: QuestionService,
              private route: ActivatedRoute ) { }
  ngOnInit(): void {
    // Get pathvariables question Set id and name.
    this.route.paramMap.subscribe(params => {
        this.setId = +params.get('id');
        this.setName = params.get('name');
    });
    this.getQuestions();
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
  // Add a new question to database, reload the page.
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
    this.questionService.postQuestion(questionObj).subscribe(() => {
      console.log('Hey im here');
      this.table.renderRows();
    });
    this.updateInsteadOfPost = false;
    this.editId = null;
    window.document.location.reload();
  }
  // Empty matchipinput choices in reset form.
  emptyChoices(): void {
    this.choices = [];
  }
  // Simple helper function
  private getInputValueById(id: string): string {
    return (document.getElementById(id) as HTMLInputElement).value;
  }
  // Get all questions for this question set, meant for table.
  private getQuestions(): void {
    this.questionService.getQuestions(this.setId)
      .subscribe(questions => this.questionSet = questions);
  }
  // Remove a question completely from database.
  public deleteQuestion(element: Question): void {
    this.questionService.removeQuestion(element).subscribe(() => window.location.reload());
  }
  // Change question field values.
  editQuestion(element: Question): void {
    (document.getElementById('question') as HTMLInputElement).value = element.question;
    (document.getElementById('points') as HTMLInputElement).value = String(element.points);
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
    console.log(JSON.stringify(element));
    this.updateInsteadOfPost = false;
    this.editId = null;
  }
}
