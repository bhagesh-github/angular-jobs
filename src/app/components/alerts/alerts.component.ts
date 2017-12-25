import { Component, Input, OnChanges, SimpleChanges, SimpleChange, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector:'app-alert',
    templateUrl:'./alerts.component.html',
    styleUrls:['./alerts.component.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class AlertComponent {
    @Input() loading;
    @Input() message;
    @Input() success;
    constructor() {
    }
}