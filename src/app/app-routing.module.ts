import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { NewProjectFormComponent } from './components/new-project-form/new-project-form.component';
import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
  { path: "create-project", component: NewProjectFormComponent },
  { path: "chat", component: ChatComponent},
  {
    path: "**",
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
