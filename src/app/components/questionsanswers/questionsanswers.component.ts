import { Component, OnInit } from '@angular/core';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';

@Component({
  selector: 'app-questionsanswers',
  templateUrl: './questionsanswers.component.html',
  styleUrls: ['./questionsanswers.component.css', '../../app.component.css']
})
export class QuestionsanswersComponent implements OnInit {

  constructor(public bgService: BackgroundImageChangeService) { }

  ngOnInit(): void {
  }

}
