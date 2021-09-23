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
  clicked: boolean = false;
  selectedScooter: Scooter = <Scooter>{};

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
    let newScooter = Scooter.createSampleScooter(this.pId);
    this.scooters.push(newScooter);
    this.pId += 3; // increase with a (random) increment of about 3 for each new scooter?
    this.onSelect(newScooter);
  }

  onSelect(scooter: Scooter): void {
    if(scooter.id === this.selectedScooter.id){
      this.selectedScooter = <Scooter>{};
    } else {
      this.selectedScooter = scooter;
    }
    // if (this.selectedScooter === null) {
    //   this.clicked = !this.clicked;
    // }else if (this.selectedScooter === scooter && this.clicked === true) {
    //   this.clicked = false;
    // } else {
    //   this.clicked = true;
    // }
  }
}
