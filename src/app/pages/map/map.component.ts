import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MarkerModel } from '../../models/marker.model';

@Component({
  template:`<app-map
    [zoom]="zoom"
    [lat]="lat"
    [lng]="lng"
    [marker]="marker"
    (markerDragEndEvt)="markerDragEnd($event)"
  ></app-map>`,
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class MapComponent implements OnInit {
  zoom:number;
  lat:number;
  lng:number;
  marker:MarkerModel;
  constructor() {

  }
  ngOnInit() {
    this.zoom = 8;
    this.lat = 51.673858;
    this.lng = 7.815982;
    this.marker = {
		  lat: 51.673858,
		  lng: 7.815982,
		  draggable: true
	  }
  }
  markerDragEnd(event) {
    console.log(event.event, event.marker);
  }
}
