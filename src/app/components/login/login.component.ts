import { Component, OnInit } from '@angular/core';
import { MatInput } from "@angular/material/input";
import { MatFormFieldControl } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from "../../Models/user.model";
import { User } from "../../Models/user";
import { UserService } from "../../Services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: MatInput },
    { provide: MatButtonModule },
  ]
})
export class LoginComponent implements OnInit {

  user: IUser = new User('', '', '', '');
  form: FormGroup;

  constructor(private addUserService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createUser();
  }

  createUser() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    const { email, password } = this.form.value;

    const user: IUser = {
      email,
      password
    };

    this.addUserService.loginUser(user).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token)
      },
      error: (msg) => {

        console.log("Error", msg);

      }, complete: () => {
        this.router.navigate([`/profile`]);
      }
    })
  }

}
