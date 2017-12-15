import { Component,ChangeDetectionStrategy,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import * as firebase from 'firebase/app';
import { SignupDumbComponent } from '../../components/auth/signup.dumb.component';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  template:`<app-signup
    [signupForm]="signupForm"
    [formErrors]="formErrors"
    (signupuser)="signupUser($event)"
  ></app-signup>`,
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class SignupComponent implements OnInit {
  signupForm:FormGroup;
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
  constructor(private fb:FormBuilder, private router:Router, public af: AngularFireAuth) {}
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
      let {email,password} = signupForm.value;
      let signupPromise = this.af.auth.createUserWithEmailAndPassword(email,password);
      signupPromise.then((data) => {
        this.router.navigate(['/auth/login']);
      }, (err)=> {
        console.log(err);
      })
    }
  }
}
