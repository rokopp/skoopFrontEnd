import { ModalService } from './../../services/modal.service';
import { MultipleChoice } from './../../questionTypes/multliple_Choice';
import { CheckBox } from './../../questionTypes/checkBox';
import { ActiveRoomsService } from './../../services/active-rooms.service';
import { GPSControl } from './gps-control';
import { Observable } from 'rxjs';
import { Question } from './../../question';
import { QuestionService } from './../../services/question.service';
import { PairService } from './../../services/pair.service';
import {Component, HostListener, OnInit} from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Location } from './../../location';
import { LocationService } from './../../services/location.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {Circle as CircleStyle, Fill, Stroke, Icon, Style} from 'ol/style';
import { ActivatedRoute } from '@angular/router';
import {defaults as defaultControls} from 'ol/control';
import {NavbarService} from '../../services/navbar.service';
import { ActiveRoom } from 'src/app/activeroom';
import { Text } from 'src/app/questionTypes/text';

declare let $: any;

// Interface to help with saving marker coordinates
interface LonAndLat {
  lat: number;
  lng: number;
}
export interface Answer {
  text: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  joinCode;
  activeRoom: ActiveRoom;
  gameId;
  form: FormGroup;
  questionobj: Question;
  // Question Types -------------
  textQuestion: Text;
  checkBoxQuestion: CheckBox;
  multipleChoiceQ: MultipleChoice;
  //  Question Parameters
  type;
  question;
  answer;
  answers: string[] = [];
  choices: string[] = [];
  hint;
  points;
  questionText;
  pointsTrue;
  pointsFalse;
  // -----
  // Question Answers
  selectedAnswer;
  selectedAnswers;
  textAnswer;
  map;
  player;
  vectorSource;
  vectorLayer: any;
  tileLayer: any;
  quizopen = true;
  answering = false;
  score = 0;
  amount = 0;
  geolocation;
  currentL: Location;
  view;
  positionFeature; // GPS Tracking
  accuracyFeature; // GPS Tracker Radius
  questions$: Observable<Question[]>;

  innerWidth: any;

  constructor(
    public acService: ActiveRoomsService,
    public modalService: ModalService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pairService: PairService,
    private locationService: LocationService,
    private questionService: QuestionService,
    public nav: NavbarService
  ) {
    this.form = this.formBuilder.group({
      answers: ['']
    });

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.joinCode = params.joincode;
        this.acService.getActiveGameByJoinCode(this.joinCode).subscribe(room => {
          this.activeRoom = room;
          this.gameId = this.activeRoom.roomId;
          this.getPairs();
        })
      });
    this.innerWidth = window.innerWidth;
    this.hideNavbarMobileView();
    this.initializeMap();
    this.updateMap();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = window.innerWidth;
    this.hideNavbarMobileView();
  }
  hideNavbarMobileView(): void {
    const myTag = document.getElementById('map');
    if (myTag.classList.contains('map')) {
      if (this.innerWidth <= 768) {
        this.nav.hide();
        myTag.classList.add('h-100');
      } else {
        this.nav.show();
        myTag.classList.remove('h-100');
      }
    }
  }

  // Checks if there are any markers close enough to the player
  public checkRadius(): void{
    const features = this.vectorLayer.getSource().getFeatures();
    features.forEach(element => {
      const id = element.getId();
      if (id !== undefined && id !== -1 && !this.answering) {
        const player = this.player.getGeometry().getCoordinates();
        const point = element.getGeometry().getClosestPoint(this.player.getGeometry().getCoordinates());
        const xdif = Math.pow(player[0] - point[0], 2);
        const ydif = Math.pow(player[1] - point[1], 2);
        const distance = Math.pow(xdif + ydif, 0.5);
        if (distance <= 100){
          this.answering = true;
          this.getQuestion(element.get('QuestionId'), element);
        }
        }
    });

  }

  // Checks if current questions answer is correct
  public checkanswer(type: string): void{
    if (this.amount === 0){
      this.modalService.open('gameEnded');
    }
    switch (type) {
      case 'CHECKBOX': {
        this.modalService.close('checkBoxQuestion');
        let checker = (arr, target) => target.every(v => arr.includes(v));
        if (checker(this.selectedAnswers, this.answers)) {
          this.score += this.pointsTrue;
          this.modalService.open('correctAnswer');
        }else {
          this.score += this.pointsFalse;
          this.modalService.open('wrongAnswerCheckBox');
        }
        break;
      }
      case 'TEXT': {
        this.modalService.close('textQuestion');
        if (this.textAnswer.trim() === this.answer.trim()) {
          this.score += this.pointsTrue;
          this.modalService.open('correctAnswer');
        }else{
          this.score += this.pointsFalse;
          this.modalService.open('wrongAnswerText');
        }
        break;
      }case 'MULTIPLE_CHOICE': {
        this.modalService.close('multipleChoiceQuestion');
        if (this.selectedAnswer === this.answer){
          this.score += this.pointsTrue;
          this.modalService.open('correctAnswer');
        }else{
          this.score += this.pointsFalse;
          this.modalService.open('wrongAnswerMultipleChoice');
        }
        break;
      }
    }
  }
  resetAnswers(): void{
    this.selectedAnswer = '';
    this.selectedAnswers = [];
    this.textAnswer = '';
    this.answer = '';
    this.answers = [];
  }

  // Get current players location and sets it as map center
  getPlayerLocation(): void{
    this.accuracyFeature = new Feature();
    this.geolocation.on('change:accuracyGeometry', () => {
    this.accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
    });
    this.accuracyFeature.setId(-1);

    this.vectorSource.addFeature(this.accuracyFeature);

    this.geolocation.setTracking(true);

    this.geolocation.on('change:position', () => {
      const coordinates = this.geolocation.getPosition();
      this.player.setGeometry(coordinates ? new Point(coordinates) : null);
      if (this.map.get('GPSMode') === 'on'){
        this.map.getView().setCenter(fromLonLat(coordinates, 'EPSG:4326', 'EPSG:3857'));
      }
      if (!this.answering){
        this.checkRadius();
      }
      // this.geolocation.setTracking(false);
    });
  }

  // Gets all question and location pairs of the current game
  getPairs(): void{
    this.pairService.getPairsByRoomId(this.gameId).subscribe(pairs =>
      pairs.forEach(pair => {
        if (pair.roomId === this.gameId){
            this.locationService.getLocationsbyId(pair.locationId).subscribe(location =>
                this.addNewLocation(location, pair.questionId)
              );
        }
      }));
  }

  // Get current markers question
  getQuestion(id: number, feature: Feature): void{
    this.questionService.getQuestionById(id).subscribe(question => {
      this.questionobj = question;
      this.showQuestion(feature, question);
    }
      );
  }

  // Saves all current question data and shows question on the map
  showQuestion(feature: Feature, question): void{
    if (this.questionobj !== undefined) {
      this.resetAnswers();
      this.type = question.type;
      this.questionText = question.questionText;
      this.pointsFalse = question.pointsFalse;
      this.pointsTrue = question.pointsTrue;
      switch (this.type) {
        case 'CHECKBOX': {
          this.choices = [];
          question.choices.forEach(q => {
          this.choices.push(q);
           });
          question.answer.forEach(q => {
          this.answers.push(q);
            });
          this.modalService.open('checkBoxQuestion');
          break;
        }
        case 'TEXT': {
          this.hint = question.hint;
          this.answer = question.answer;
          this.modalService.open('textQuestion');
          break;
        }case 'MULTIPLE_CHOICE': {
          this.choices = [];
          this.answer = question.answer;
          question.choices.forEach(q => {
          this.choices.push(q);
           });
          this.modalService.open('multipleChoiceQuestion');
          break;
        }
      }
      this.amount--;
      this.vectorSource.removeFeature(feature);
    }
  }

  // Function the gets correct coordinates of marker and calls helper function to add them to the map
  addNewLocation(location: Location, qID: number): void{
    this.amount++;
    const coordinates: LonAndLat = JSON.parse(location.location);
    this.createMarekrs(coordinates.lng, coordinates.lat, location.id, qID);
  }

  // Helper function that adds markers on the map
  createMarekrs(Lon, Lat, Id, qID): Feature{
    const marker = new Feature({
      geometry: new Point(fromLonLat([Lon, Lat])),
      name: 'marker'
    });
    marker.setStyle(new Style({
      image: new Icon(({
        crossOrigin: 'anonymous',
        src: './assets/mapIcons/place.png',
        scale: 0.08,
      }))
    }));
    marker.setId(Id);
    marker.set('QuestionId', qID);
    this.vectorSource.addFeature(marker);
    this.checkRadius();
  }


  openModal(id: string, element: Question): void {
    this.modalService.open(id);
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }

  onChange(answer, isChecked: boolean): void{
    if(isChecked) {
      this.selectedAnswers.push(answer);
    } else {
      const index = this.selectedAnswers.indexOf(answer);
      this.selectedAnswers.splice(index, 1);
    }
}

  // Builds map and adds all required components to make the map work
  private initializeMap(): void {
    this.player = new Feature({
      geometry: new Point(fromLonLat([24.6675, 59.39503])),
      name: 'player'
    });
    this.player.setStyle(new Style({
      image: new Icon(({
        crossOrigin: 'anonymous',
        src: 'assets/mapIcons/arrow.png',
        scale: 0.08,
      }))
    }));

    this.vectorSource = new VectorSource({
      features: [this.player]
    });
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });
    this.tileLayer = new TileLayer({
      source: new OSM()
    });
    this.view = new View({
      center: fromLonLat([24.6675, 59.39503]),
      zoom: 16
    });

    this.map = new Map({
      target: 'map',
      layers: [this.tileLayer, this.vectorLayer],
      view: this.view,
      controls: defaultControls().extend([new GPSControl()]),
    });
    this.map.set('GPSMode', 'on');

    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.view.getProjection(),
    });
  }
  // Main function that checks if player clicks on markers
  private updateMap(): void {
    this.getPlayerLocation();
    this.map.on('click', (data) => {
      if (this.amount === 0) {
        this.modalService.open('gameEnded');
      } else {
        this.map.forEachFeatureAtPixel(data.pixel, (feature) => {
          const id = feature.get('QuestionId');
          if (id !== undefined && id !== -1) {
            this.getQuestion(id, feature);
          }
        });
      }
    });
  }
}
