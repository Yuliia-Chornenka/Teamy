import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatInput } from "@angular/material/input";
import { MatFormFieldControl } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from "../../Models/user.model";
import { User } from "../../Models/user";
import { AddUserService } from "../../Sevices/add-user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MatFormFieldControl, useExisting: MatInput},
    { provide: MatButtonModule },
    ]
})
export class RegistrationComponent implements OnInit {

  user: IUser = new User(  '', '', '', '');
  form: FormGroup;

  constructor(private addUserService: AddUserService) { }

  ngOnInit(): void {
    this.createUser();
  }

  createUser() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl(  '', Validators.required),
      password: new FormControl(  '', Validators.required),
    });
  }

  register() {
    const { name, email, password } = this.form.value;

    const  user: IUser = {
      name,
      email,
      password
    };
    console.log(user)
    this.addUserService.addUser(user).subscribe( user => {
      //
      this.form.reset();
    }, err => console.error(err));
  }
}
