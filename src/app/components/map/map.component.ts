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
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

declare let $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('modal') modal:ElementRef;

  map;
  point1;
  point2;
  point3;
  player;
  vectorSource;
  vectorLayer: any;
  tileLayer: any;
  quizopen = false;
  points = ['point1', 'point2', 'point3'];
  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }
  showModal(){
    // Show modal with jquery
    $(this.modal.nativeElement).modal('show');
}

  initializeMap() {

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
    console.log(this.map);
    this.map.on('click', (data) => {
      this.quizopen = false;
      this.map.forEachFeatureAtPixel(data.pixel, (feature, layer) => {
        const clicked = feature.get('name');
        if (this.points.includes(clicked)){
          this.showModal();
        }
        console.log(clicked);
      });
    });
  }

}
