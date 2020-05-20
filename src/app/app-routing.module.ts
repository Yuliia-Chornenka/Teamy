import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: '',
    component: AppComponent,
  },
  {
    path: '**',
    redirectTo: 'AppComponent',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
