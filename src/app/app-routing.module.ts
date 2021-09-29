import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { WelcomeComponent } from './components/welcome/welcome.component';
import {Overview31Component} from "./components/scooters/overview31/overview31.component";
import {Overview32Component} from "./components/scooters/overview32/overview32.component";
import {Overview33Component} from "./components/scooters/overview33/overview33.component";
import {UnknownRouteComponent} from "./components/unknown-route/unknown-route.component";

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'scooters/overview31', component: Overview31Component},
  { path: 'scooters/overview32', component: Overview32Component},
  { path: 'scooters/overview33', component: Overview33Component},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: UnknownRouteComponent}
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
