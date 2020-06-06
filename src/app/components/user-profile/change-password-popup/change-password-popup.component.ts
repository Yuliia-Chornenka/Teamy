import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { UserService } from '../../../Services/user.service';
import { IUser } from '../../../Models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss']
})
export class ChangePasswordPopupComponent implements OnInit {

  formChangePassword: FormGroup;
  successSubmitted = true;
  invalidPassword = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private snackBar: MatSnackBar, public dialogChangePassword: MatDialogRef<ChangePasswordPopupComponent>) { }

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

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  onSubmit(): void {
    this.successSubmitted = true;
    this.invalidPassword = false;
    this.formChangePassword.disable();

    let {password, newPassword, newPasswordConfirmation} = this.formChangePassword.controls;
    password = password.value;
    newPassword = newPassword.value;
    newPasswordConfirmation = newPasswordConfirmation.value;

    const passwords = {
      password,
      newPassword,
      newPasswordConfirmation
    };

    this.userService.changeAccountPassword(passwords).subscribe({
      next: (user: IUser) => {
        this.successSubmitted = true;
        this.invalidPassword = false;
        this.dialogChangePassword.close();
        this.openSnackBar('Your password has been successfully changed', '✔');
      },
      error: (err) => {
        if (err.status === 401) {
          this.invalidPassword = true;
        } else {
          this.successSubmitted = false;
        }
        this.formChangePassword.enable();
      }
    });
  }
}
