import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {EffectsModule} from '@ngrx/effects';
import {AuthRoutingModule} from './auth.routes';
import {AuthEffects} from '../../effects/auth.effects';


@NgModule({
    imports:[FormsModule,AuthRoutingModule,EffectsModule.run(AuthEffects),HttpModule],
    exports:[],
    declarations:[]
})

export class AuthModule {}