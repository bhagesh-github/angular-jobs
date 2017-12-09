import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
// import { AuthService } from "angular4-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { LoginDumbComponent } from '../../components/auth/login.dumb.component';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    template:`
        <app-login 
            [loginForm]="loginForm"
            (googleLogin)="signInGoogle()"
            (facebookLogin)="signInFacebook()"
        >
        </app-login>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {
  error: any;
  loginForm: FormGroup;
  constructor(public af: AngularFireAuth, private router: Router, private fb: FormBuilder) {

      this.af.auth.onAuthStateChanged(auth => { 
      if(auth) {
        console.log("logged in");
      } else {
          console.log("not logged");
      }
    });
  }
    ngOnInit() {
        this.initializeLoginForm();
    }
    initializeLoginForm() {
        this.loginForm = this.fb.group({
            email:[null,Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
            password:[null,Validators.compose([Validators.required,Validators.minLength(8)])]
        })
    }
    signInGoogle() {
        console.log("google");
        this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => console.log(res));
    }
    signInFacebook() {
        this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
}