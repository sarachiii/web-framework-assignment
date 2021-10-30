import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from './components/header/header.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {Overview31Component} from './components/scooters/overview31/overview31.component';
import {Overview32Component} from './components/scooters/overview32/overview32.component';
import {Detail32Component} from './components/scooters/detail32/detail32.component';
import {Overview33Component} from './components/scooters/overview33/overview33.component';
import {Detail33Component} from './components/scooters/detail33/detail33.component';
import {AppRoutingModule} from "./app-routing.module";
import {UnknownRouteComponent} from './components/unknown-route/unknown-route.component';
import {Overview34Component} from './components/scooters/overview34/overview34.component';
import {Detail34Component} from './components/scooters/detail34/detail34.component';
import {Detail37Component} from "./components/scooters/detail37/detail37.component";
import {Overview37Component} from "./components/scooters/overview37/overview37.component";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    NavBarComponent,
    Overview31Component,
    Overview32Component,
    Detail32Component,
    Overview33Component,
    Detail33Component,
    UnknownRouteComponent,
    Overview34Component,
    Detail34Component,
    Detail37Component,
    Overview37Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
