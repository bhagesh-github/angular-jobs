import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './login.component';
import { LoginDumbComponent } from '../../components/auth/login.dumb.component';
import { AuthService } from './auth.services';

export const firebaseConfig = {
  apiKey: 'AIzaSyB-loZ-mTw2wTiJsu1Oelfl2e3Z1cUxV3c',
  authDomain: 'fir-tutorials-a346e.firebaseapp.com',
  databaseURL: 'https://fir-tutorials-a346e.firebaseio.com',
  projectId: "fir-tutorials-a346e",
  storageBucket: "fir-tutorials-a346e.appspot.com",
  messagingSenderId: "62982970114"
};


const AUTH_ROUTES: Routes = [
    {
        path:'',
        component:AuthComponent,
        children:[
            {
                path:'',
                redirectTo:'login',
                pathMatch:'full'
            },
            {
                path:'login',
                component:LoginComponent
            }
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(AUTH_ROUTES),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    exports:[],
    declarations:[AuthComponent,LoginComponent,LoginDumbComponent],
    providers:[AuthService]
})

export class AuthRoutingModule {}