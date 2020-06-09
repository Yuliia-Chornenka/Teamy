import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-member-form',
  templateUrl: './add-new-member-form.component.html',
  styleUrls: ['./add-new-member-form.component.scss']
})
export class AddNewMemberFormComponent implements OnInit {

  isPending = false;
  successSubmitted = true;
  formNewMember: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formNewMember = new FormGroup({
      name: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
    });
  }

  onSubmit(): void {
    let {name, email} = this.formNewMember.controls;
    name = name.value.toLowerCase();
    email = email.value;

    this.formNewMember.disable();
    this.isPending = true;
    this.successSubmitted = true;
  }

  get nameControl(): AbstractControl {
    return this.formNewMember.get('name');
  }

  get emailControl(): AbstractControl {
    return this.formNewMember.get('email');
  }

  getErrorMessageName(): string {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a name';
    }
    return this.nameControl.hasError('minlength') ? 'Name must be at least 2 characters' : '';
  }

  getErrorMessageEmail(): string {
    if (this.emailControl.hasError('required')) {
      return 'You must enter email';
    }
    return this.emailControl.hasError('email') ? 'Please enter valid email' : '';
  }
}
