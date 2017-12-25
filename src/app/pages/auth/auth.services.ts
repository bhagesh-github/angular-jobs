import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class AuthService {
    constructor(private http:Http, private af: AngularFireAuth) {}
    login(loginData) {
        let {email,password} = loginData;
        return Observable.fromPromise(this.af.auth.signInWithEmailAndPassword(email,password));
    }
    signup(signupData) {
        let { email, password } = signupData;
        return Observable.fromPromise(this.af.auth.createUserWithEmailAndPassword(email,password));
    }
}