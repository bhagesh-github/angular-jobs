import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginDumbComponent } from '../../components/auth/login.dumb.component';
import * as formRoot from '../../reducers';
import { UserModel } from '../../models/user.model';
import { LoginUser, LoginUserSuccess, LoginUserError, Alert } from '../../actions/auth.actions';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    template:`
        <app-login
            [loginForm]="loginForm"
            [formErrors]="formErrors"
            [error]="error | async"
            (googleLogin)="signInGoogle()"
            (facebookLogin)="signInFacebook()"
            (loginuser)="loginUser($event)"
        >
        </app-login>
        <app-alert
          [loading]="showAlert | async"
          [message]="loadingMsg | async"
          [success]="success | async"
        >
        </app-alert>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  success:Observable<boolean>;
  showAlert:Observable<boolean>;
  loadingMsg:Observable<string>;
  loadingAction:boolean = false;
  errorAction:boolean = false;
  successAction:boolean = false;
  formErrors = {
    email:'',
    password:''
  };
  validationMessages = {
    email: {
      required: 'Email is required',
      pattern: 'Enter valid email'
    },
    password: {
      required: 'Password is required',
      minlength: 'Password should be minimum 8 charactres in length'
    }
  };
  constructor(public af: AngularFireAuth, private router: Router, private fb: FormBuilder, private store: Store<formRoot.State>) {
    this.af.auth.onAuthStateChanged(auth => {
      if(auth) {
        setTimeout(() => {
          this.router.navigate(['/map']);
        },1000);
      } else {
        this.router.navigate(['/auth']);
      }
    });
    this.showAlert = this.store.select(state => state.auth.showAlert);
    this.loadingMsg = this.store.select(state => state.auth.loadingMsg);
    this.success = this.store.select(state => state.auth.success)
  }
  ngOnInit() {
      this.initializeLoginForm();
      this.loginForm.valueChanges.subscribe(data => this.validateForm());
  }
  initializeLoginForm() {
      this.loginForm = this.fb.group({
          email:[null,Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
          password:[null,Validators.compose([Validators.required,Validators.minLength(8)])]
      });
  }
  validateForm() {
      for(let field in this.formErrors) {
        this.formErrors[field] = '';

        let input = this.loginForm.get(field);

        if(input.invalid && input.dirty) {
          for(let error in input.errors) {
            this.formErrors[field] = this.validationMessages[field][error];
          }
        }
      }
  }
  signInGoogle() {
      this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => this.router.navigate(['/map']));
  }
  signInFacebook() {
      this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => this.router.navigate(['/map']));
  }
  loginUser(loginForm) {
      if(loginForm.valid) {
        this.store.dispatch(new Alert({showAlert:true,loadingMsg:'Authentication in progress...',success:undefined}));
        this.store.dispatch(new LoginUser(loginForm.value));
      }
  }
  ngOnDestroy() {
    
  }
}
