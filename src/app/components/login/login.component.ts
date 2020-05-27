import { Component, OnInit } from '@angular/core';
import { MatInput } from "@angular/material/input";
import { MatFormFieldControl } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from "../../Models/user.model";
import { User } from "../../Models/user";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { IToken } from '../../Models/token'

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
  returnUrl: string;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createUser();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

    this.authService.loginUser(user).subscribe({
      next: (response: IToken) => {

        localStorage.setItem('token', response.token)
      },
      error: (msg) => {

        console.log('Error', msg);

      }, complete: () => {
        this.router.navigate([this.returnUrl]);
      }
    });
  }

}
