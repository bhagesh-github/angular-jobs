import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { LoginDumbComponent } from '../../components/auth/login.dumb.component';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    template:`
        <app-login
            [loginForm]="loginForm"
            [formErrors]="formErrors"
            (googleLogin)="signInGoogle()"
            (facebookLogin)="signInFacebook()"
            (loginuser)="loginUser($event)"
        >
        </app-login>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {
  error: any;
  loginForm: FormGroup;
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
  constructor(public af: AngularFireAuth, private router: Router, private fb: FormBuilder) {
      this.af.auth.onAuthStateChanged(auth => {
      if(auth) {
        this.router.navigate(['/map']);
      } else {
        console.log("not logged");
      }
    });
  }
  ngOnInit() {
      this.initializeLoginForm();
      this.loginForm.valueChanges.subscribe(data => this.validateForm(data));
  }
  initializeLoginForm() {
      this.loginForm = this.fb.group({
          email:[null,Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
          password:[null,Validators.compose([Validators.required,Validators.minLength(8)])]
      })
  }
  validateForm(data) {
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
        let {email,password} = loginForm.value;
        let loginPromise = this.af.auth.signInWithEmailAndPassword(email, password);
        loginPromise.then((data) => {
          console.log(data);
          this.router.navigate(['/map']);
        },(err) => {

        })
      }
  }
}
