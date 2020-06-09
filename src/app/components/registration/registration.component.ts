import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingState } from 'src/app/reducers/loading/loading.reducer';
import { LoadingStartAction, LoadingFinishAction } from 'src/app/reducers/loading/loading.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmRegisterComponent } from './confirm-alert/confirm-alert.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MatFormFieldControl, useExisting: MatInput },
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
    private router: Router,
    private store$: Store<LoadingState>,
    public dialog: MatDialog) {
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

  get userName(): AbstractControl {
    return this.form.get('name');
  }

  get userEmail(): AbstractControl {
    return this.form.get('email');
  }

  get userPsw(): AbstractControl {
    return this.form.get('password');
  }

  getErrorMessageName(): string {
    if (this.userName.hasError('required')) {
      return 'You must enter a name';
    }
    return this.userName.hasError('minlength') ? 'Name must be at least 2 characters' : '';
  }

  getErrorMessageEmail(): string {
    if (this.userEmail.hasError('required')) {
      return 'You must enter email';
    }
    return this.userEmail.hasError('email') ? 'Please enter valid email. Example: email@gmail.com' : '';
  }

  getErrorMessagePsw(): string {
    if (this.userPsw.hasError('required')) {
      return 'You must enter password';
    }
    return this.userPsw.hasError('password') ? 'Password must be at least 5 characters' : '';
  }


  register() {
    if (this.form.valid === false) {
      this.invalidRegister = true;
      this.errorMessage = 'One of the fields is incorrect!';
    } else {
      this.store$.dispatch(new LoadingStartAction());

      const { name, email, password } = this.form.value;

      const user: IUser = {
        name,
        email,
        password
      };
      this.addUserService.addUser(user).subscribe(
        () => {
          this.form.reset();
          this.dialog.open(ConfirmRegisterComponent);
        },
        error => {
          if (error.status === 400) {
            this.errorMessage = 'The email address you have used is already registered!';
          }
        },
        () => {
          this.invalidRegister = false;
          this.store$.dispatch(new LoadingFinishAction());
          this.router.navigate(['login']);
        });
    }
  }
}
