import {Component,Input,Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector:'app-login',
    templateUrl:'./app-auth-form.html',
    styleUrls:['./login.component.scss']
}) 

export class LoginDumbComponent {
    @Input() loginForm: FormGroup;
    @Output() googleLogin = new EventEmitter();
    @Output() facebookLogin = new EventEmitter();
    loginUser() {
        console.log(this.loginForm.value);
    }
    signInGoogle() {
        this.googleLogin.emit();
    }
    signInFacebook() {
        this.facebookLogin.emit();
    }
}