import { Location } from './../../location';
import { LocationService } from './../../services/location.service';
import { QuestionService } from './../../services/question.service';
import {ActivatedRoute} from '@angular/router';
import {LocationsetsService} from '../../services/locationsets.service';
import {QuestionsetsService} from '../../services/questionsets.service';
import {Locationset} from '../../locationset';
import {Questionset} from '../../questionset';
import {PairService} from '../../services/pair.service';
import {Pair} from '../../pair';
import {Location as URL} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { Question } from 'src/app/question';


@Component({
  selector: 'app-create-new-room',
  templateUrl: './create-new-room.component.html',
  styleUrls: ['./create-new-room.component.css']
})
export class CreateNewRoomComponent implements OnInit {
  questionSetdata: Questionset[] = [];
  locationSetdata: Locationset[] = [];
  questions: Question[] = [];
  locations: Location[] = [];
  questionsAmount = 0;
  locationAmount = 0;
  selectedQuestionSet;
  selectedLocationSet;
  currentId;
  minAmount = 0;
  succeful = false;
  constructor(private location: URL,
              private locationSetS: LocationsetsService,
              private questionSetS: QuestionsetsService,
              private questionService: QuestionService,
              private locationService: LocationService,
              private pairS: PairService,
              private activatedroute: ActivatedRoute,
              ) {
    this.currentId = this.activatedroute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getLocationSets();
    this.getQuestionSets();
  }
  getQuestionSets(): void{
    this.questionSetS.getQuestionSets().subscribe(sets => this.questionSetdata = sets);
  }
  getLocationSets(): void{
    this.locationSetS.getLocationSets().subscribe(sets => this.locationSetdata = sets);
  }
  backClicked(): void{
    this.location.back();
  }
  addPair(): void{
    if (this.selectedQuestionSet && this.selectedLocationSet){
      this.questionService.getQuestions(this.selectedQuestionSet).subscribe(questions => this.questions = questions);
      this.locationService.getLocationsBySet(this.selectedLocationSet).subscribe(locations => this.locations = locations);
      this.minAmount = Math.min(this.questions.length, this.locations.length);
      if (this.minAmount !== 0){
        for (let i = 0; i < this.minAmount; i++){
          this.pairS.postPair({questionId: this.questions[i].id, locationId: this.locations[i].id, roomId: this.currentId} as Pair)
          .subscribe(() => {
          },
            error => {
              const errorMessage = error.message;
              console.error('Happened this during posting: ', errorMessage);
            });
        }
        this.backClicked();
      }
    }
  }
  deletePairs(): void{
    this.pairS.getPairs().subscribe(pairs => {
      pairs.forEach(pair => {
        if (pair.roomId.toString() === this.currentId){
          this.pairS.removePair(pair.id).subscribe();
          this.succeful = true;
        }
      });
    });
    if (this.succeful){
      alert('Edukalt Kustutatud');
      this.succeful = false;
    }
  }
}
