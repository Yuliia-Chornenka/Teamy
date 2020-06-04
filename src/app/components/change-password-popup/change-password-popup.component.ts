import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss']
})
export class ChangePasswordPopupComponent implements OnInit {

  formChangePassword: FormGroup;
  successSubmitted = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formChangePassword = this.formBuilder.group({
      password: ['', [ Validators.required ]],
      newPassword: ['', [ Validators.required, Validators.minLength(6) ]],
      newPasswordConfirmation: ['', [ Validators.required]],
    }, {
      validator: MustMatch('newPassword', 'newPasswordConfirmation')
    });
  }

  get passwordControl(): AbstractControl {
    return this.formChangePassword.get('password');
  }

  get newPasswordControl(): AbstractControl {
    return this.formChangePassword.get('newPassword');
  }

  get newPasswordConfirmationControl(): AbstractControl {
    return this.formChangePassword.get('newPasswordConfirmation');
  }

  getErrorMessagePassword(): string {
    if (this.passwordControl.hasError('required')) {
      return 'You must enter a password';
    }
  }

  getErrorMessageNewPassword(): string {
    if (this.newPasswordControl.hasError('required')) {
      return 'You must enter new password';
    }
    return this.newPasswordControl.hasError('minlength') ? 'Password must be at least 6 characters' : '';
  }

  getErrorMessageNewPasswordConfirmation(): string {
    if (this.newPasswordConfirmationControl.hasError('required')) {
      return 'You must enter new password again';
    }
    return this.newPasswordConfirmationControl.hasError('mustMatch') ? 'Passwords do not match' : '';
  }

  onSubmit(): void {
    let {password, newPassword, newPasswordConfirmation} = this.formChangePassword.controls;
    password = password.value;
    newPassword = newPassword.value;
    newPasswordConfirmation = newPasswordConfirmation.value;

    console.log(password, newPassword, newPasswordConfirmation);
  }
}
