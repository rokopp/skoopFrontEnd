import { PairDetail } from '../../pairDetails';
import { Location } from '../../location';
import { LocationService } from '../../services/location.service';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { LocationsetsService } from '../../services/locationsets.service';
import { QuestionsetsService } from '../../services/questionsets.service';
import { Locationset } from '../../locationset';
import { Questionset } from '../../questionset';
import { PairService } from '../../services/pair.service';
import { Pair } from '../../pair';
import { Location as URL } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/question';
import { NotificationsService} from 'angular2-notifications';
import {BackgroundImageChangeService} from "../../services/background-image-change.service";


@Component({
  selector: 'app-create-new-room',
  templateUrl: './create-new-room.component.html',
  styleUrls: ['./create-new-room.component.css', '../../app.component.css']
})
export class CreateNewRoomComponent implements OnInit {
  questionSetdata: Questionset[] = [];
  locationSetdata: Locationset[] = [];
  questions: Question[] = [];
  locations: Location[] = [];
  pairDetails: PairDetail[] = [];
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
              private nService: NotificationsService,
              public bgService: BackgroundImageChangeService
  ) {
    this.currentId = this.activatedroute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getCurrentPairs();
    this.getLocationSets();
    this.getQuestionSets();
  }
  onSuccess(message): void {
    this.nService.success('Edukas', message, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }
  onError(message): void {
    this.nService.error('Viga', message, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }
  getQuestionSets(): void {
    this.questionSetS.getQuestionSets().subscribe(sets => this.questionSetdata = sets);
  }
  getLocationSets(): void {
    this.locationSetS.getLocationSets().subscribe(sets => this.locationSetdata = sets);
  }
  backClicked(): void {
    this.location.back();
  }
  addPair(): void {
    if (this.selectedQuestionSet && this.selectedLocationSet) {
      this.minAmount = Math.min(this.questions.length, this.locations.length);
      if (this.minAmount !== 0) {
        for (let i = 0; i < this.minAmount; i++) {
          this.pairS.postPair({ questionId: this.questions[i].id, locationId: this.locations[i].id, roomId: this.currentId } as Pair)
            .subscribe(pair => {
              this.getPairDetails(this.locations[i].id, this.questions[i].id, pair.id);
            },
              error => {
                const errorMessage = error.message;
                console.error('Happened this during posting: ', errorMessage);
              });
        }
        this.onSuccess('Paarid edukalt genereeritud');
      }else {
        this.onError('Üks settidest on tühi');
      }
    }else {
      this.onError('Väljad täitmata');
    }
  }
  updateQuestion(): void {
    this.questionService.getQuestions(this.selectedQuestionSet).subscribe(questions => this.questions = questions);
  }
  updateLocation(): void {
    this.locationService.getLocationsBySet(this.selectedLocationSet).subscribe(locations => this.locations = locations);
  }
  getCurrentPairs(): void{
    this.pairS.getPairsByRoomId(this.currentId).subscribe( pairs => {
      pairs.forEach(pair => {
        this.getPairDetails(pair.locationId, pair.questionId, pair.id);
      });
    });
  }
  getPairDetails(locationId: number, questionId: number, pairId: number): void {
    this.locationService.getLocationsbyId(locationId).subscribe(location => {
      const coordinates = JSON.parse(location.location);
      const newCoordinates = 'pikkuskraad: ' + coordinates.lng +  ', laiuskraad: ' + coordinates.lat;
      this.questionService.getQuestionById(questionId).subscribe(question => {
        this.pairDetails.push(new PairDetail(pairId, newCoordinates, question.question));
      });
    });
  }

  deletePairs(): void {
    this.pairS.removePairbyRoomId(this.currentId).subscribe(pair => {
      this.onSuccess('Paarid edukalt kustutatud');
      this.pairDetails = [];
    },
    error => {
      this.onError('Viga kustutamisel. Proovi uuesti');
    }
    );
  }
}
