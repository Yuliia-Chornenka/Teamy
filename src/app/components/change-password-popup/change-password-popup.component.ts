import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss']
})
export class ChangePasswordPopupComponent implements OnInit {

  formChangePassword: FormGroup;
  successSubmitted = true;

  constructor() { }

  ngOnInit(): void {
    this.formChangePassword = new FormGroup({
      oldPassword: new FormControl('', [ Validators.required ]),
      newPassword: new FormControl('', [ Validators.required ]),
      newPasswordAgain: new FormControl('', [ Validators.required ]),
    });
  }

  onSubmit(): void {
    let {oldPassword, newPassword, newPasswordAgain} = this.formChangePassword.controls;
    oldPassword = oldPassword.value;
    newPassword = newPassword.value;
    newPasswordAgain = newPasswordAgain.value;

    console.log(oldPassword, newPassword, newPasswordAgain);
  }
}
