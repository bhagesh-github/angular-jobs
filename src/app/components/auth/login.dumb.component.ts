import {Component,Input,Output,EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector:'app-login',
    templateUrl:'./app-login-form.html',
    styleUrls:['./auth.component.scss']
})

export class LoginDumbComponent {
    @Input() loginForm: FormGroup;
    @Input() formErrors: Object;
    @Input() error: string;
    @Output() googleLogin = new EventEmitter();
    @Output() facebookLogin = new EventEmitter();
    @Output() loginuser = new EventEmitter();
    loginUser(loginForm) {
        this.loginuser.emit(loginForm);
    }
    signInGoogle() {
        this.googleLogin.emit();
    }
    signInFacebook() {
        this.facebookLogin.emit();
    }
}
