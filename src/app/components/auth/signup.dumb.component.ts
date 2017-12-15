import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector:'app-signup',
  templateUrl:'./app-signup-form.html',
  styleUrls:['./auth.component.scss']
})
export class SignupDumbComponent {
  @Input() signupForm:FormGroup;
  @Input() formErrors: Object;
  @Output() signupuser = new EventEmitter();

  signupUser(signupForm) {
    this.signupuser.emit(signupForm);
  }

}
