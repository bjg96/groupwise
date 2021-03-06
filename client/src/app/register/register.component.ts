import { Component, OnInit } from '@angular/core';

import {AlertService} from "../services/alert/alert.service";
import {Alert} from "../services/alert/alert";
import {Router} from "@angular/router";
import {UserRegistrationService} from "../services/user/registration-service/user-registration.service";
import {UserRegistrationModel} from "../services/user/registration-service/user-registration.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserRegistrationService]
})
export class RegisterComponent implements OnInit {
  registrationComplete: Boolean;

  constructor(private alertService: AlertService, private router: Router, private userRegistrationService: UserRegistrationService) { }

  ngOnInit() {
    if (this.router.url != '/register')
      this.router.navigateByUrl('/register');

    this.userRegistrationService.setSequence(['/register', '/register/tos', '/register/prescreen', '/register/attributes']);
    this.registrationComplete = false;
  }

  getProgress() {
    return this.userRegistrationService.getProgress() * 100;
  }

  getSequenceLength() {
    return this.userRegistrationService.getLength();
  }

  getSequenceCurrent() {
    return this.userRegistrationService.getCurrent();
  }

  onNext() {
    this.userRegistrationService.next();
  }

  onPrevious() {
    this.userRegistrationService.previous();
  }

  canMoveToNext() {
    if (this.getSequenceCurrent() == 1)
      return this.userRegistrationService.userRegistrationForm.valid;
    if (this.getSequenceCurrent() == 2)
      return this.userRegistrationService.tosForm.valid;
    if (this.getSequenceCurrent() == 3)
      return true;
    if (this.getSequenceCurrent() == 4)
      return this.userRegistrationService.getAttributeForm().valid;
    return false;
  }

  canMoveToPrev() {
    return true;
  }

  onRegister() {
    let user = <UserRegistrationModel>this.userRegistrationService.userRegistrationForm.value;

    this.userRegistrationService.register(user)
      .then(user => {
        const alert = new Alert();
        alert.Text = "Please check your email to complete registration";
        alert.Type = "success";
        this.alertService.addAlert(alert);
        this.router.navigateByUrl('');
      })
      .catch(error => {
        console.log(error);
      });
  }

}
