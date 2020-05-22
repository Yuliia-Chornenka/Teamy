import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { NewProjectFormComponent } from './components/new-project-form/new-project-form.component';
import { ChatComponent } from './components/chat/chat.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectComponent } from './components/project/project.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'project/create',
    component: NewProjectFormComponent
  },
  {
    path: 'project/:title/:id',
    component: ProjectComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
