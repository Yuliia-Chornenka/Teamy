import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewProjectFormComponent } from './components/new-project-form/new-project-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NewProjectFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
