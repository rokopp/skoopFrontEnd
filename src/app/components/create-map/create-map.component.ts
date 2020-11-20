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
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

declare let $: any;

@Component({
  selector: 'app-create-map',
  templateUrl: './create-map.component.html',
  styleUrls: ['./create-map.component.css']
})
export class CreateMapComponent implements OnInit {

  @ViewChild('modal') modal: ElementRef;
  map;
  view;
  geolocation;
  player;
  vectorSource;
  vectorLayer: any;
  tileLayer: any;
  urlID;
  id = 1;
  action = 'add';
  markers = [];
  positionFeature; // GPS Tracking
  accuracyFeature; // GPS Tracker Radius
  locationSet = [];
  oldLocationSet = [];
  currentSet = 1;
  constructor(private _Activatedroute:ActivatedRoute, private _location: Location) {
    this.urlID = this._Activatedroute.snapshot.paramMap.get("id");
    console.log(this.urlID);
  }
  ngOnInit(): void {
    this.initializeMap();
  }
  remove(): void{
    this.action = 'remove';
  }
  add(): void{
    this.action = 'add';
  }
  backClicked(): void{
    this._location.back();
  }
  getlocation(): void{
    this.accuracyFeature = new Feature();
    this.geolocation.on('change:accuracyGeometry', () => {
    this.accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
    });
    this.positionFeature.setId(-1);
    this.accuracyFeature.setId(-1);

    this.vectorSource.addFeature(this.positionFeature);
    this.vectorSource.addFeature(this.accuracyFeature);

    this.geolocation.setTracking(true);

    this.geolocation.on('change:position', () => {
      const coordinates = this.geolocation.getPosition();
      this.positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
      this.map.getView().setCenter(fromLonLat(coordinates, 'EPSG:4326', 'EPSG:3857'));
      this.geolocation.setTracking(false);
    });
  }
  getAllfeatures(list): void{
    const features = this.vectorSource.getFeatures();
    features.forEach(element => {
      if (element.getId() != null && element.getId() !== 0){
        list.push(element);
      }
    });
  }

  /* loadLocationset(): void{
    if (this.currentSet === 1){
      this.oldLocationSet = [];
      this.getAllfeatures(this.oldLocationSet);
      this.vectorSource.clear();
      this.locationSet.forEach( (value) => {
        this.vectorSource.addFeature(value);
      });
      this.currentSet = 2;
    }else{
      this.locationSet = [];
      this.getAllfeatures(this.locationSet);
      this.vectorSource.clear();
      this.oldLocationSet.forEach( (value) => {
        this.vectorSource.addFeature(value);
      });
      this.currentSet = 1;
    }
    this.vectorSource.addFeature(this.positionFeature);
    this.vectorSource.addFeature(this.accuracyFeature);
    this.vectorSource.addFeature(this.player);
  } */
  createMarekrs(Lon, Lat): Feature{
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
    marker.setId(this.id);
    this.id++;
    return marker;
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
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.view.getProjection(),
    });

    this.positionFeature = new Feature();
    this.positionFeature.setStyle(
    new Style({
    image: new CircleStyle({
      radius: 5,
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
    this.getlocation();

    this.map.on('click', (data) => {
      const coordinates = transform(data.coordinate, 'EPSG:3857', 'EPSG:4326');
      if (this.action === 'add'){
        this.vectorSource.addFeature(this.createMarekrs(coordinates[0], coordinates[1]));
      }else{
        this.map.forEachFeatureAtPixel(data.pixel, (feature, layer) => {
          if (feature.getId() !== 0 && feature.getId() !== -1){
            this.vectorSource.removeFeature(feature);
          }
        });
      }
    });
  }

}
