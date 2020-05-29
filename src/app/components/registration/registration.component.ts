import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../Models/user.model';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

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

  user: IUser = new User('', '', '', '', '');
  form: FormGroup;
  invalidRegister = false;
  errorMessage = '';

  constructor(
    private addUserService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.createUser();
  }

  createUser() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  register() {
    if (this.form.valid === false) {
      this.invalidRegister = true;
      this.errorMessage = 'One of the fields is incorrect!';
    } else {

      const {name, email, password} = this.form.value;

      const user: IUser = {
        name,
        email,
        password
      };
      this.addUserService.addUser(user).subscribe(
        () => {
          this.form.reset();
        },
        error => {
          if (error.status === 400) {
            this.errorMessage = 'The email address you have used is already registered!';
          }
        },
        () => {
          this.invalidRegister = false;
          this.router.navigate(['login']);
        });
    }
  }
}
