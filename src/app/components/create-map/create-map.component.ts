import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import {transform, fromLonLat} from 'ol/proj.js';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {Circle as CircleStyle, Fill, Stroke, Icon, Style} from 'ol/style';
import { FormBuilder, FormGroup} from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-create-map',
  templateUrl: './create-map.component.html',
  styleUrls: ['./create-map.component.css']
})
export class CreateMapComponent implements OnInit {

  @ViewChild('modal') modal: ElementRef;
  form: FormGroup;
  question;
  answers = [];
  correctanswer;
  map;
  view;
  geolocation;
  player;
  vectorSource;
  vectorLayer: any;
  tileLayer: any;
  quizopen = true;
  score = 0;
  id = 1;
  action = 'add';
  markers = [];
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      answers: ['']
    });
  }
  ngOnInit(): void {
    this.initializeMap();
  }
  private showModal(): void{
    $(this.modal.nativeElement).modal('show');
  }
  remove(): void{
    this.action = 'remove';
  }
  add(): void{
    this.action = 'add';
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
    this.player.setId(0);
    this.markers = [this.player];
    this.vectorSource = new VectorSource({
      features: this.markers
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
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.view.getProjection(),
    });

    const positionFeature = new Feature();
    positionFeature.setStyle(
    new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#3399CC',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2,
          }),
        }),
       })
    );
    const accuracyFeature = new Feature();
    this.geolocation.on('change:accuracyGeometry', () => {
    accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
    });

    this.vectorSource.addFeature(positionFeature);
    this.vectorSource.addFeature(accuracyFeature);

    this.geolocation.setTracking(true);

    this.geolocation.on('change:position', () => {
      const coordinates = this.geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
      this.map.getView().setCenter(fromLonLat(coordinates, 'EPSG:4326', 'EPSG:3857'));
      this.geolocation.setTracking(false);
    });

    this.map.on('click', (data) => {
      const coordinates = transform(data.coordinate, 'EPSG:3857', 'EPSG:4326');
      const marker = new Feature({
        geometry: new Point(fromLonLat(coordinates)),
        name: 'marker'
      });
      marker.setStyle(new Style({
        image: new Icon(({
          color: [113, 140, 0],
          crossOrigin: 'anonymous',
          src: './assets/mapIcons/place.png',
          scale: 0.08,
        }))
      }));
      if (this.action === 'add'){
        marker.setId(this.id);
        this.id++;
        this.vectorSource.addFeature(marker);
      }else{
        this.map.forEachFeatureAtPixel(data.pixel, (feature, layer) => {
          if (feature.getId() !== 0){
            this.vectorSource.removeFeature(feature);
          }
            // this.showModal();
        });
      }
    });
  }

}
