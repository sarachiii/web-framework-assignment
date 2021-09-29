import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-unknown-route',
  templateUrl: './unknown-route.component.html',
  styleUrls: ['./unknown-route.component.css']
})
export class UnknownRouteComponent implements OnInit {
  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
  }

}
