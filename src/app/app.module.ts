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
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { ChatUsersComponent } from './components/chat/chat-users/chat-users.component';
import { ChatInfoComponent } from './components/chat/chat-info/chat-info.component';




@NgModule({
  declarations: [
    AppComponent,
    NewProjectFormComponent,
    NotFoundPageComponent,
    ChatComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    RegistrationComponent,
    LoginComponent,
    ChatMessageComponent,
    ChatUsersComponent,
    ChatInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    TextFieldModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
