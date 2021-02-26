import { Location } from './../../location';
import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-create-map',
  templateUrl: './create-map.component.html',
  styleUrls: ['./create-map.component.css']
})
export class CreateMapComponent implements OnInit {

  @ViewChild('modal') modal: ElementRef;
  target;
  map;
  view;
  geolocation;
  player;
  vectorSource;
  vectorLayer: any;
  tileLayer: any;
  locationSetId;
  locations: Location[] = [];
  action = 'add';
  markers = [];
  positionFeature; // GPS Tracking
  accuracyFeature; // GPS Tracker Radius
  currentSet = 1;
  constructor(private _Activatedroute:ActivatedRoute, private _location: URL, private locationService: LocationService) {
    this.locationSetId = this._Activatedroute.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {
    this.initializeMap();
    this.getAllLocations();
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
  getAllLocations(): void{
    this.locationService.getLocations().subscribe(locations =>
      locations.forEach(location => {
        // this.locations.push(location);
        if (location.locationSetId.toString() === this.locationSetId){
          this.addNewLocation(location);
        }
      }));
  }
  addNewLocation(location: Location): void{
    const coordinates: LonAndLat = JSON.parse(location.location);
    this.createMarekrs(coordinates.lng, coordinates.lat, location.id);
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
  createMarekrs(Lon, Lat, Id): Feature{
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
    this.vectorSource.addFeature(marker);
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
      const locationFormat = '{\"lat\" : ' + coordinates[1].toPrecision(9) + ', \"lng\" : ' + coordinates[0].toPrecision(9) + '}';
      if (this.action === 'add'){
        const locationObj = {
          locationSetId: this.locationSetId,
          location: locationFormat,
          coverRadius: 2
        };
        this.locationService.postLocation(locationObj).subscribe(
          response => {
                      this.createMarekrs(coordinates[0], coordinates[1], response.id);
          },
          error => {
            const errorMessage = error.message;
            console.error('Happened this during posting: ', errorMessage);
          }
        );
      }else{
        this.map.forEachFeatureAtPixel(data.pixel, (feature, layer) => {
          if (feature.getId() !== 0 && feature.getId() !== -1){
            this.locationService.removeLocation(feature.getId()).subscribe({
              error: error => {
                const errorMessage = error.message;
                console.error('Happened this during deleting: ', errorMessage);
              }
            });
            this.vectorSource.removeFeature(feature);
          }
        });
      }
    });
  }

}
