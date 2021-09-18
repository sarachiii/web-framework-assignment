import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showCurrentDate() {
    let currentDate = new Date();
    let dateFormat = currentDate.toLocaleString('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
    return dateFormat;
  }
}
