import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewProjectFormComponent } from './components/new-project-form/new-project-form.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { ChatUsersComponent } from './components/chat/chat-users/chat-users.component';
import { ChatInfoComponent } from './components/chat/chat-info/chat-info.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilterPipe } from './Pipes/filter.pipe';
import { SearchPipe } from './Pipes/search.pipe';

import { CreateTeamsComponent } from './components/create-teams/create-teams.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddNewMemberFormComponent } from './components/add-new-member-form/add-new-member-form.component';
import { ProjectComponent } from './components/project/project.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { AuthGuard } from './Guards/auth.guard';
import { TokenInterceptorService } from './Services/token-iterceptor/token-interceptor.service';

import { ChatMemberComponent } from './components/chat/chat-member/chat-member.component';

import {
  SocialLoginModule,
  AuthServiceConfig,
  LoginOpt,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { UserProjectsListComponent } from './components/user-projects-list/user-projects-list.component';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppEffects } from './app.effects';
import { ChatProfilePicComponent } from './components/chat/chat-profile-pic/chat-profile-pic.component';
import { DeleteProfilePopupComponent } from './components/delete-profile-popup/delete-profile-popup.component';
import { CountdownModule } from 'ng2-date-countdown';
import { ChangePasswordPopupComponent } from './components/change-password-popup/change-password-popup.component';
import { AuthorComponent } from './components/project/author/author.component';

// const fbLoginOptions: LoginOpt = {
//   scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
//   return_scopes: true,
//   enable_profile_selector: true
// }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
//
// const googleLoginOptions: LoginOpt = {
//   scope: 'profile email'
// }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

const config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider('Google-OAuth-Client-Id')
  // },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2635201316727876'),
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NewProjectFormComponent,
    NotFoundPageComponent,
    ChatComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    CreateTeamsComponent,
    RegistrationComponent,
    LoginComponent,
    ChatMessageComponent,
    ChatUsersComponent,
    ChatInfoComponent,
    AddNewMemberFormComponent,
    ProjectComponent,
    UserProfileComponent,
    ChatMemberComponent,
    UserProjectsListComponent,
    FilterPipe,
    SearchPipe,
    ChatProfilePicComponent,
    DeleteProfilePopupComponent,
    ChangePasswordPopupComponent,
    AuthorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    DragDropModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    TextFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSidenavModule,
    ClipboardModule,
    SocialLoginModule,
    MatSnackBarModule,
    MatSortModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    StoreRouterConnectingModule.forRoot(),
    CountdownModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
