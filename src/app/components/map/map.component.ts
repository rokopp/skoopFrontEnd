import { Observable } from 'rxjs';
import { Question } from './../../question';
import { QuestionService } from './../../services/question.service';
import { PairService } from './../../services/pair.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Location } from './../../location';
import { LocationService } from './../../services/location.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import { transform, LonLat, LonLatfrom } from 'ol/proj.js';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {Circle as CircleStyle, Fill, Stroke, Icon, Style} from 'ol/style';
import { ActivatedRoute } from '@angular/router';
import {Location as URL} from '@angular/common';

declare let $: any;

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
  gameId;
  selectedAnswer;
  form: FormGroup;
  questionobj: Question;
  question;
  answer;
  choices: String[] = [];
  points;
  map;
  player;
  vectorSource;
  vectorLayer: any;
  tileLayer: any;
  quizopen = true;
  score = 0;
  amount = 0;
  geolocation;
  currentL: Location;
  view;
  positionFeature; // GPS Tracking
  accuracyFeature; // GPS Tracker Radius
  questions$: Observable<Question[]>;
  constructor(private formBuilder: FormBuilder,
              private _Activatedroute:ActivatedRoute,
              private _location: URL,
              private pairService: PairService,
              private locationService: LocationService,
              private questionService: QuestionService
              ) {
    this.form = this.formBuilder.group({
      answers: ['']
    });
    this.gameId = this._Activatedroute.snapshot.paramMap.get('id');
  }

  public getAnswers(point): any{}
  public checkanswer(): void{
    console.log(this.selectedAnswer);
    if (this.selectedAnswer.trim() === this.answer.trim()){
      this.score = this.score + this.points;
    }else{
      this.score = this.score - this.points;
    }
    if (this.amount === 0){
      this.quizopen = false;
    }else{
      $(this.modal.nativeElement).modal('hide');
    }
  }

  getlocation(): void{
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
      this.map.getView().setCenter(fromLonLat(coordinates, 'EPSG:4326', 'EPSG:3857'));
      this.geolocation.setTracking(false);
    });
  }

  getPairs(): void{
    this.pairService.getPairs().subscribe(pairs =>
      pairs.forEach(pair => {
        if (pair.roomId.toString() === this.gameId){
            this.locationService.getLocationsbyId(pair.locationId).subscribe(location =>
                this.addNewLocation(location, pair.questionId)
              );
        }
      }));
  }
  getQuestion(id: number): void{
    this.questionService.getQuestionById(id).subscribe(question =>
      this.questionobj = question);
  }

  addNewLocation(location: Location, qID: number): void{
    this.amount++;
    const coordinates: LonAndLat = JSON.parse(location.location);
    this.createMarekrs(coordinates.lng, coordinates.lat, location.id, qID);
  }
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
  }

  ngOnInit(): void {
    this.initializeMap();
    this.getPairs();
  }
  private showModal(): void{
    $(this.modal.nativeElement).modal('show');
  }

  private initializeMap(): void{
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
    });

    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.view.getProjection(),
    });
    this.getlocation();

    this.map.on('click', (data) => {
      if (this.amount === 0){
        this.quizopen = false;
        this.showModal();
      }else{
        this.map.forEachFeatureAtPixel(data.pixel, (feature, layer) => {
          const id = feature.get('QuestionId');
          console.log(this.amount);
          if (id !== undefined && id !== -1){
            this.getQuestion(id);
            if (this.questionobj !== undefined){
              this.question = this.questionobj.question;
              this.answer = this.questionobj.answer;
              this.choices = [];
              this.questionobj.choices.forEach(q => {
                this.choices.push(q);
              });
              this.choices = this.questionobj.choices;
              this.points = this.questionobj.points;
              console.log(this.choices);
              console.log(this.answer);
              this.showModal();
              this.amount--;
              this.vectorSource.removeFeature(feature);
            }
          }
        });
     }
    });
  }
}
