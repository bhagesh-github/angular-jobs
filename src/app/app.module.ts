import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import { RoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { REDUCERS } from './reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    StoreModule.provideStore(REDUCERS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
