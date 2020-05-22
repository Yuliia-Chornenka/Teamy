import { Component, OnInit } from '@angular/core';
import { MatInput } from "@angular/material/input";
import { MatFormFieldControl } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from "../../Models/user.model";
import { User } from "../../Models/user";
import { AddUserService } from "../../Sevices/add-user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: MatInput},
    { provide: MatButtonModule },
  ]
})
export class LoginComponent implements OnInit {

  user: IUser = new User(  '', '', '', '');
  form: FormGroup;

  constructor(private addUserService: AddUserService) { }

  ngOnInit(): void {
    this.createUser();
  }

  createUser() {
    this.form = new FormGroup({
      email: new FormControl(  '', Validators.required),
      password: new FormControl(  '', Validators.required),
    });
  }

  login() {
    const { email, password } = this.form.value;

    const  user: IUser = {
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
