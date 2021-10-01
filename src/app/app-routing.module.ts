import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { WelcomeComponent } from './components/welcome/welcome.component';
import {Overview31Component} from "./components/scooters/overview31/overview31.component";
import {Overview32Component} from "./components/scooters/overview32/overview32.component";
import {Overview33Component} from "./components/scooters/overview33/overview33.component";
import {Overview34Component} from "./components/scooters/overview34/overview34.component";
import {UnknownRouteComponent} from "./components/unknown-route/unknown-route.component";
import {Detail34Component} from "./components/scooters/detail34/detail34.component";

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'scooters/overview31', component: Overview31Component},
  { path: 'scooters/overview32', component: Overview32Component},
  { path: 'scooters/overview33', component: Overview33Component},
  { path: 'scooters/overview34', component: Overview34Component, children: [
      {
        path: ':id',
        component: Detail34Component
      },
    ],
  },
  // { path: 'scooters/overview34', redirectTo: '/scooters/overview34/-', pathMatch: 'full'},
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
