import { Component,ChangeDetectionStrategy,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SignupDumbComponent } from '../../components/auth/signup.dumb.component';
import { AlertComponent } from '../../components/alerts/alerts.component';
import * as fromRoot from '../../reducers';
import { SignupUser } from '../../actions/auth.actions';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  template:`<app-signup
    [signupForm]="signupForm"
    [formErrors]="formErrors"
    (signupuser)="signupUser($event)"
  ></app-signup>
  <app-alert
    [loading]="loadingStatus"
    [message]="loadingMsg"
    [success]="success | async"
  >
  </app-alert>
  `,
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  loading:Observable<Boolean>;
  success:Observable<Boolean>;
  loadingStatus:Boolean;
  loadingMsg:string = "";
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
  constructor(private fb:FormBuilder, private router:Router, public af: AngularFireAuth, private store: Store<fromRoot.State>) {
    this.loading = this.store.select(state => state.auth.loading);
    this.success = this.store.select(state => state.auth.success);
    this.loading.subscribe(data => {
      this.loadingStatus = data;
      if(this.loadingStatus === true) {
        this.loadingMsg = 'Signing up the user';
      } else {
        this.loadingMsg = "Signing up user failed";
      }
    })
  }
  ngOnInit() {
    this.initializeSignupForm();
    this.signupForm.valueChanges.subscribe(data => this.validateForm(data));
  }
  initializeSignupForm() {
    this.signupForm = this.fb.group({
      email:[null,Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
      password:[null,Validators.compose([Validators.required,Validators.minLength(8)])]
    })
  }
  validateForm(data) {
      for(let field in this.formErrors) {
        this.formErrors[field] = '';

        let input = this.signupForm.get(field);

        if(input.invalid && input.dirty) {
          for(let error in input.errors) {
            this.formErrors[field] = this.validationMessages[field][error];
          }
        }
      }
  }
  signupUser(signupForm) {
    if(signupForm.valid) {
      this.store.dispatch(new SignupUser(signupForm.value));
    }
  }
}
