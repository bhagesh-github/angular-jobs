import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { MarkerModel } from '../../models/marker.model';

@Component({
    selector:'app-map',
    templateUrl:'./map.html',
    styleUrls:['./map.scss']
})
export class MapDumbComponent {
    @Input() lat:number;
    @Input() lng:number;
    @Input() zoom:number;
    @Input() marker:MarkerModel;
    @Output() markerDragEndEvt = new EventEmitter();

    markerDragEnd(marker, event) {
        this.markerDragEndEvt.emit({marker:marker,event:event});
    }
}