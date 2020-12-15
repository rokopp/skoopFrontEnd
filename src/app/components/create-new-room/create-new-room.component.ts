import { ActivatedRoute } from '@angular/router';
import { LocationsetsService } from './../../services/locationsets.service';
import { QuestionsetsService } from './../../services/questionsets.service';
import { Locationset } from './../../locationset';
import { Questionset } from './../../questionset';
import { PairService } from './../../services/pair.service';
import { Pair } from './../../pair';
import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-create-new-room',
  templateUrl: './create-new-room.component.html',
  styleUrls: ['./create-new-room.component.css']
})
export class CreateNewRoomComponent implements OnInit {
  questionSetdata: Questionset[] = [];
  locationSetdata: Locationset[] = [];
  selectedQuestion;
  selectedLocation;
  currentId;
  constructor(private location: Location,
              private locationS: LocationsetsService,
              private questionS: QuestionsetsService,
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
    this.questionS.getQuestionSets().subscribe(sets => this.questionSetdata = sets);
  }
  getLocationSets(): void{
    this.locationS.getLocationSets().subscribe(sets => this.locationSetdata = sets);
  }
  backClicked(): void{
    this.location.back();
  }
  addPair(): void{
    this.pairS.postPair({questionId: this.selectedQuestion, locationId: this.selectedLocation, roomId: this.currentId} as Pair)
    .subscribe(() => {
      this.backClicked();
    },
      error => {
        const errorMessage = error.message;
        console.error('Happened this during posting: ', errorMessage);
      });
}
}
