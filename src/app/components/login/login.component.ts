import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IToken } from '../../models/token';
import { AuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
} from 'angularx-social-login';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { LoadingState } from 'src/app/reducers/loading/loading.reducer';
import {
  LoadingStartAction,
  LoadingFinishAction,
} from 'src/app/reducers/loading/loading.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: MatInput },
    { provide: MatButtonModule },
  ],
})
export class LoginComponent implements OnInit {
  user: IUser = new User('', '', '', '', '');
  form: FormGroup;
  returnUrl: string;
  invalidLogin = false;
  errorMessage = '';

  userSocial: SocialUser;
  private loggedIn: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private authSocialService: AuthService,
    private addUserService: UserService,
    private store$: Store<LoadingState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createUser();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/profile';

    this.authSocialService.authState.subscribe((userSocial) => {
      this.userSocial = userSocial;
      this.loggedIn = userSocial != null;
    });
  }

  createUser() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.store$.dispatch(new LoadingStartAction());

    const { email, password } = this.form.value;

    const user: IUser = {
      email,
      password,
    };

    this.authService.loginUser(user).subscribe({
      next: (response: IToken) => {
        localStorage.setItem('token', response.token);
        this.authService.setValue(this.authService.loggedIn());
      },
      error: (error) => {
        this.store$.dispatch(new LoadingFinishAction());
        if (error.status === 400) {
          this.invalidLogin = true;
          this.errorMessage = 'The email is not found!';
        } else if (error.status === 401) {
          this.invalidLogin = true;
          this.errorMessage = 'The password is not correct!';
        }
      },
      complete: () => {
        this.store$.dispatch(new LoadingFinishAction());
        this.router.navigate([this.returnUrl]);
      },
    });
  }

  signInWithFB(): void {
    this.store$.dispatch(new LoadingStartAction());
    this.authSocialService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {
        const userSoc: IUser = {
          name: user.name,
          email: user.email,
          photo: user.photoUrl,
        };

        this.addUserService.addSocUser(userSoc).subscribe(
          (resp) => {
            localStorage.setItem('token', resp.token);
            this.authService.setValue(this.authService.loggedIn());
          },
          (error) => {
            this.store$.dispatch(new LoadingFinishAction());
            if (error.status === 400) {
              this.openSnackBar(error.error.message, 'ERROR');
            }
          },
          () => {
            this.store$.dispatch(new LoadingFinishAction());
            this.router.navigate(['/profile']);
          }
        );
      });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
