import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {QuestionService} from '../../services/question.service';
import {MatTable} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {Question, QuestionCheckBox} from '../../question';
import {Subscription} from 'rxjs';
import {ModalService} from '../../services/modal.service';

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
  choicesMultiple: Answer[] = [];
  choicesCheckbox: Answer[] = [];
  choicesText: Answer[] = [];
  checkBoxAnswers: string[] = [];
  setId: number;
  setName: string;
  private subscriptions: Subscription[] = [];
  selectCorrectAnswerNr: Answer[] = [];

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              public modalService: ModalService) { }

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
  addAnswer(event: MatChipInputEvent, questionType: string): void {
    const input = event.input;
    const value = event.value;
    // Add answer
    if (questionType === 'multipleChoices') {
      if ((value || '').trim()) {
        this.choicesMultiple.push({text: value.trim()});
      }
    }
    if (questionType === 'checkbox') {
      if ((value || '').trim()) {
        this.choicesCheckbox.push({text: value.trim()});
      }
    }
    if (questionType === 'edit') {
      if ((value || '').trim()) {
        this.choices.push({text: value.trim()});
      }
    }

    // Reset input value
    if (input) {
      input.value = '';
    }
  }

  // Remove one choice from question.
  remove(answer: Answer, questionType: string): void {
    if (questionType === 'multipleChoices') {
      const indexMultiple = this.choicesMultiple.indexOf(answer);
      if (indexMultiple >= 0) {
        this.choicesMultiple.splice(indexMultiple, 1);
      }
    }
    if (questionType === 'checkbox') {
      const indexCheckbox = this.choicesCheckbox.indexOf(answer);
      if (indexCheckbox >= 0) {
        this.choicesCheckbox.splice(indexCheckbox, 1);
      }
    }
    if (questionType === 'edit') {
      const index = this.choices.indexOf(answer);
      if (index >= 0) {
        this.choices.splice(index, 1);
      }
    }

  }

  // Returns a question put together from input values.
  createQuestion(questionType: string): Question {
    const questionval = this.getInputValueById('question' + questionType);
    const answerval = this.getInputValueById('answer' + questionType);
    const pointsTrueval = this.getInputValueById('pointsTrue' + questionType);
    const pointsFalseval = this.getInputValueById('pointsFalse' + questionType);
    const choices1 = [];
    if (questionType === 'MultipleChoices') {
      this.choicesMultiple.forEach(choice => choices1.push(choice.text));
      return {
        questionSetId: this.setId,
        questionText: questionval,
        answer: answerval,
        pointsTrue: +pointsTrueval,
        pointsFalse: -pointsFalseval,
        hint: 'your mom',
        id: null,
        choices: choices1
      };
    }
    if (questionType === 'Text') {
      const hintval = this.getInputValueById('hint' + questionType);
      this.choicesText.forEach(choice => choices1.push(choice.text));
      return {
        questionSetId: this.setId,
        questionText: questionval,
        answer: answerval,
        pointsTrue: +pointsTrueval,
        pointsFalse: -pointsFalseval,
        hint: hintval,
        id: null,
        choices: choices1
      };
    }
    if (questionType === 'edit') {
      this.choices.forEach(choice => choices1.push(choice.text));
      return {
        questionSetId: this.setId,
        questionText: questionval,
        answer: answerval,
        pointsTrue: +pointsTrueval,
        pointsFalse: -pointsFalseval,
        hint: 'your mom',
        id: null,
        choices: choices1
      };
    }

  }

  // Returns a question put together from input values.
  createQuestionCheckBox(questionType: string): QuestionCheckBox {
    const questionval = this.getInputValueById('question' + questionType);
    const pointsTrueval = this.getInputValueById('pointsTrue' + questionType);
    const pointsFalseval = this.getInputValueById('pointsFalse' + questionType);
    const choices1 = [];
    this.choicesCheckbox.forEach(choice => choices1.push(choice.text));
    return {
      questionSetId: this.setId,
      questionText: questionval,
      answer: this.checkBoxAnswers,
      pointsTrue: +pointsTrueval,
      pointsFalse: -pointsFalseval,
      id: null,
      choices: choices1
    };
  }

  // TODO Add question type
  // Add a new question to database, reload the page.
  addQuestion(questionType: string): void {
    let sub;
    if (questionType === 'Checkbox') {
      const questionObj = this.createQuestionCheckBox(questionType);
      sub = this.questionService.postQuestionCheckBox(questionObj, questionType).subscribe(() => {
        this.getQuestions();
      });
    } else {
      const questionObj = this.createQuestion(questionType);
      sub = this.questionService.postQuestion(questionObj, questionType).subscribe(() => {
        this.getQuestions();
      });
    }

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
    (document.getElementById('questionEdit') as HTMLInputElement).value = element.questionText;
    (document.getElementById('pointsTrueEdit') as HTMLInputElement).value = String(element.pointsTrue);
    (document.getElementById('pointsFalseEdit') as HTMLInputElement).value = String(element.pointsFalse);
    (document.getElementById('answerEdit') as HTMLInputElement).value = element.answer;
    this.choices = [];
    if (typeof element.choices === 'undefined') {
      const choiceAnswer = {text: element.answer};
      this.choices.push(choiceAnswer);
    } else {
      element.choices.forEach(choice => {
        const choiceAnswer = {text: choice};
        this.choices.push(choiceAnswer); }
      );
    }

    this.updateInsteadOfPost = true;
    this.editId = element.id;
  }

  // Update question selected for edit, otherwise submits new question.
  updateQuestion(element: Question, questionType: string): void {
    const questionObj = this.createQuestion(questionType);
    questionObj.id = element.id;
    this.updateInsteadOfPost = false;
    this.editId = null;
    const sub = this.questionService.putQuestion(questionObj).subscribe(() => {
        this.getQuestions();
      },
      error => console.error(error));
    this.subscriptions.push(sub);
  }

  selectCorrectAnswer(id: number, element: Answer, questionType: string): void {
    const selectedElement = document.getElementById(questionType + '_choice_' + id);
    if (selectedElement.getAttribute('isSelected') === 'false') {
      if (this.selectCorrectAnswerNr.length > 0) {
        this.selectCorrectAnswerNr = [];
        this.setChoiceElementsToFalse(questionType);
      }
      selectedElement.setAttribute('isSelected', 'true');
      this.selectCorrectAnswerNr.push(element);
    } else {
      this.deleteCorrectAnswerFromList(element);
      selectedElement.setAttribute('isSelected', 'false');
    }
    this.updateCorrectAnswerField(questionType);
  }

  selectCheckBoxCorrectAnswer(id: number, element: Answer, questionType: string): void {
    const selectedElement = document.getElementById(questionType + '_choice_' + id);
    if (selectedElement.getAttribute('isSelected') === 'false') {
      selectedElement.setAttribute('isSelected', 'true');
      this.selectCorrectAnswerNr.push(element);
      this.checkBoxAnswers.push(element.text);
    } else {
      this.deleteCorrectAnswerFromList(element);
      this.deleteCheckBoxCorrectAnswerFromList(element);
      selectedElement.setAttribute('isSelected', 'false');
    }
    this.updateCorrectAnswerField(questionType);
  }

  setBg(id: number, questionType: string): string {
    const selectedElement = document.getElementById(questionType + '_choice_' + id);
    if (selectedElement.getAttribute('isSelected') === 'true') {
      return 'selectedCorrectAnswer';
    }
    return '';
  }

  setChoiceElementsToFalse(questionType: string): void {
    if (questionType === 'multipleChoices') {
      this.choicesMultiple.forEach((setToFalseSelect, index) => {
        document.getElementById(questionType + '_choice_' + index).setAttribute('isSelected', 'false');
      });
    }
    if (questionType === 'checkbox') {
      this.choicesCheckbox.forEach((setToFalseSelect, index) => {
        document.getElementById(questionType + '_choice_' + index).setAttribute('isSelected', 'false');
      });
    }
    if (questionType === 'edit') {
      this.choices.forEach((setToFalseSelect, index) => {
        document.getElementById(questionType + '_choice_' + index).setAttribute('isSelected', 'false');
      });
    }
  }

  updateCorrectAnswerField(questionType: string): void {
    if (questionType !== 'checkbox') {
      if (this.selectCorrectAnswerNr.length === 0) {
        (document.getElementById('answer' + questionType[0].toUpperCase() + questionType.slice(1)) as HTMLInputElement).value = '';
      }
      this.selectCorrectAnswerNr.forEach((answer) => {
        (document.getElementById('answer' + questionType[0].toUpperCase() + questionType.slice(1)) as HTMLInputElement).value = answer.text;
      });
    } else {
      (document.getElementById('answer' + questionType[0].toUpperCase() + questionType.slice(1)) as HTMLInputElement).value = '';
      this.checkBoxAnswers.forEach((answer) => {
        const typeToUpper = questionType[0].toUpperCase() + questionType.slice(1);
        const currentAnswers = (document.getElementById('answer' + typeToUpper) as HTMLInputElement).value;
        if (currentAnswers.length === 0) {
          (document.getElementById('answer' + typeToUpper) as HTMLInputElement).value += answer;
        } else {
          (document.getElementById('answer' + typeToUpper) as HTMLInputElement).value = currentAnswers + ',' + answer;
        }
      });
    }

  }

  deleteCorrectAnswerFromList(deleteElement: Answer): void {
    this.selectCorrectAnswerNr.forEach((element, index) => {
      if (element === deleteElement) { this.selectCorrectAnswerNr.splice(index, 1); }
    });
  }

  deleteCheckBoxCorrectAnswerFromList(deleteElement: Answer): void {
    this.checkBoxAnswers.forEach((element, index) => {
      if (element === deleteElement.text) { this.checkBoxAnswers.splice(index, 1); }
    });
  }

  openModal(id: string, element: Question): void {
    this.modalService.open(id);
    this.modalService.setElementQuestion(element);
  }

  openModalForCreating(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }
}
