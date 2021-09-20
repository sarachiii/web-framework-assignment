import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { Overview31Component } from './components/scooters/overview31/overview31.component';
import { Overview32Component } from './components/scooters/overview32/overview32.component';
import { Detail32Component } from './components/scooters/detail32/detail32.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    NavBarComponent,
    Overview31Component,
    Overview32Component,
    Detail32Component,

  ],
    imports: [
        BrowserModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
