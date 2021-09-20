import {Component, OnInit} from '@angular/core';
import {Scooter} from "../../../models/scooter";

@Component({
  selector: 'app-overview32',
  templateUrl: './overview32.component.html',
  styleUrls: ['./overview32.component.css'],
})
export class Overview32Component implements OnInit {

  scooters: Scooter[];
  pId: number = 30000;
  clicked: boolean = null;
  // selected = [];

  constructor() {
  }

  ngOnInit() {
    this.scooters = [];
    for (let i = 0; i < 8; i++) {
      this.scooters.push(Scooter.createSampleScooter(this.pId));
      this.pId += 3; //increase with a (random) increment of about 3 for each new scooter?
    }
  }

  onAddScooter() {
    this.scooters.push(Scooter.createSampleScooter(this.pId));
    this.pId += 3; // increase with a (random) increment of about 3 for each new scooter?
    // this.selected.push(true);
    this.clicked = true;
  }

  selectedScooter(i) {
  }
}
