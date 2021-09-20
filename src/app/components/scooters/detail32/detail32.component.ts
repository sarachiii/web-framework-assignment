import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scooters-detail32',
  templateUrl: './detail32.component.html',
  styleUrls: ['./detail32.component.css']
})
export class Detail32Component implements OnInit {
  @Input() selectedScooterFromOverview;
  constructor() { }

  ngOnInit(): void {
  }

}
