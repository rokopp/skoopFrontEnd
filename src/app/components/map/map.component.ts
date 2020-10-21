import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
import { FormBuilder, FormGroup} from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  form: FormGroup;
  question;
  answers = [];
  correctanswer;
  map;
  point1;
  point2;
  point3;
  player;
  vectorSource;
  vectorLayer: any;
  tileLayer: any;
  quizopen = true;
  score = 0;
  points = ['point1', 'point2', 'point3'];
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      answers: ['']
    });
  }

  public getAnswers(point): any{
    if (point === 'point1'){
      this.correctanswer = '3';
      this.question = 'How many fingers am i holding up';
      return [
        { id: '1', name: '1' },
        { id: '2', name: '2' },
        { id: '3', name: '3' },
        { id: '4', name: '4' }
      ];
    }else if (point === 'point2'){
      this.question = 'Mis kell hakkab tund?';
      this.correctanswer = '1';
      return [
        { id: '1', name: '17:00' },
        { id: '2', name: '17:30' },
        { id: '3', name: '18:00' },
        { id: '4', name: 'null' }
      ];
    }
    this.correctanswer = '3';
    this.question = 'Mitu paki nuudleid saab osta 1 euro eest?';
    return [
      { id: '1', name: '4-5' },
      { id: '2', name: '1' },
      { id: '3', name: 'palju tahad?' },
      { id: '4', name: 'ijuu nuudlid' }
    ];
  }
  checkanswer(): void{
    const answer = this.form.get('answers').value;
    if (answer === this.correctanswer){
      this.score += 250;
      alert('Correct');
    }else{
      this.score -= 100;
      alert('Wrong');
    }
    if (this.points.length === 0 ){
      this.quizopen = false;
      this.showModal();
    }else{
      $(this.modal.nativeElement).modal('hide');
    }
  }
  ngOnInit(): void {
    this.initializeMap();
  }
  private showModal(): void{
    $(this.modal.nativeElement).modal('show');
  }

  private initializeMap(): void{
    this.point1 = new Feature({
      geometry: new Point(fromLonLat([24.6699, 59.39400])),
      name: 'point1'
    });
    this.point1.setStyle(new Style({
      image: new Icon(({
        color: [113, 140, 0],
        crossOrigin: 'anonymous',
        src: './assets/mapIcons/place.png',
        scale: 0.08,
      }))
    }));
    this.point2 = new Feature({
      geometry: new Point(fromLonLat([24.6673, 59.3960])),
      name: 'point2'
    });
    this.point2.setStyle(new Style({
      image: new Icon(({
        crossOrigin: 'anonymous',
        src: './assets/mapIcons/place.png',
        scale: 0.08,
      }))
    }));
    this.point3 = new Feature({
      geometry: new Point(fromLonLat([24.6695, 59.39645])),
      name: 'point3'
    });
    this.point3.setStyle(new Style({
      image: new Icon(({
        color: [113, 140, 0],
        crossOrigin: 'anonymous',
        src: './assets/mapIcons/place.png',
        scale: 0.08,
      }))
    }));
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
      features: [this.point1, this.point2, this.point3, this.player]
    });
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });
    this.tileLayer = new TileLayer({
      source: new OSM()
    });

    this.map = new Map({
      target: 'map',
      layers: [this.tileLayer, this.vectorLayer],
      view: new View({
        center: fromLonLat([24.6675, 59.39503]),
        zoom: 16
      })
    });
    this.map.on('click', (data) => {
      this.map.forEachFeatureAtPixel(data.pixel, (feature, layer) => {
        const clicked = feature.get('name');
        if (this.points.includes(clicked)){
          const index = this.points.indexOf(clicked, 0);
          if (index > -1) {
            this.points.splice(index, 1);
         }
          this.answers = this.getAnswers(clicked);
          this.showModal();
        }
      });
    });
  }
}
