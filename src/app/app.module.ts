import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SocialLoginModule, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { CountdownModule } from 'ng2-date-countdown';

import { MaterialModule } from './material/material.module';
import { AppEffects } from './app.effects';
import { reducers, metaReducers } from './reducers';
import { AuthGuard } from './guards/auth.guard';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { TokenInterceptorService } from './services/token-iterceptor/token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewProjectFormComponent } from './components/new-project-form/new-project-form.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { ChatUsersComponent } from './components/chat/chat-users/chat-users.component';
import { ChatInfoComponent } from './components/chat/chat-info/chat-info.component';
import { CreateTeamsComponent } from './components/create-teams/create-teams.component';
import { AddNewMemberFormComponent } from './components/add-new-member-form/add-new-member-form.component';
import { ProjectComponent } from './components/project/project.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChatMemberComponent } from './components/chat/chat-member/chat-member.component';
import { UserProjectsListComponent } from './components/user-profile/user-projects-list/user-projects-list.component';
import { ChatProfilePicComponent } from './components/chat/chat-profile-pic/chat-profile-pic.component';
import { DeleteProfilePopupComponent } from './components/user-profile/delete-profile-popup/delete-profile-popup.component';
import { ChangePasswordPopupComponent } from './components/user-profile/change-password-popup/change-password-popup.component';
import { AuthorComponent } from './components/project/author/author.component';
import { AddMentorFormComponent } from './components/project/add-mentor-form/add-mentor-form.component';
import { ChatInfoHeaderComponent } from './components/chat/chat-info-header/chat-info-header.component';
import { ChatImagesComponent } from './components/chat/chat-images/chat-images.component';
import { ChatFilesComponent } from './components/chat/chat-files/chat-files.component';
import { ChatMentorComponent } from './components/chat/chat-mentor/chat-mentor.component';
import { ChatLinkComponent } from './components/chat/chat-link/chat-link.component';
import { ChatLinkIconComponent } from './components/chat/chat-link/chat-link-icon/chat-link-icon.component';
import { ChatAssessmentComponent } from './components/chat/chat-assessment/chat-assessment.component';

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
    AddMentorFormComponent,
    ChatInfoHeaderComponent,
    ChatImagesComponent,
    ChatFilesComponent,
    ChatMentorComponent,
    ChatLinkComponent,
    ChatLinkIconComponent,
    ChatAssessmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClipboardModule,
    SocialLoginModule,
    EffectsModule.forRoot([ AppEffects ]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({maxAge: 25}),
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
