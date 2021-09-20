import { Component, OnInit } from '@angular/core';
import {Scooter} from "../../../models/scooter";

@Component({
  selector: 'app-overview31',
  templateUrl: './overview31.component.html',
  styleUrls: ['./overview31.component.css']
})
export class Overview31Component implements OnInit {

  scooters: Scooter[];
  pId: number = 30000;

  constructor() { }

  ngOnInit() {
    this.scooters = [];
    for (let i = 0; i < 8; i++) {
      this.scooters.push(Scooter.createSampleScooter(this.pId));
      this.pId += 3;
      console.log(this.scooters[i]);
    }
  }
}

