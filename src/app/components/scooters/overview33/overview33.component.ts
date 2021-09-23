import {Component, Inject, OnInit} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";

@Component({
  selector: 'app-overview33',
  templateUrl: './overview33.component.html',
  styleUrls: ['./overview33.component.css']
})
export class Overview33Component implements OnInit {

  scooters: Scooter[];
  pId: number = 30000;
  clicked: boolean = false;
  selectedScooter: Scooter = <Scooter>{};

  constructor() {
    // @Inject(ScootersService)
  }

  ngOnInit() {
    this.scooters = [];
    for (let i = 0; i < 8; i++) {
      this.scooters.push(Scooter.createSampleScooter(this.pId));
      this.pId += 3; //increase with a (random) increment of about 3 for each new scooter?
    }
  }

  // get scooters: Scooter[]{
  //
  // }


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
  }

  onDelete(selectedScooter: Scooter) {
    this.scooters = this.scooters.filter(scooter => selectedScooter.id != scooter.id)
    this.selectedScooter = <Scooter>{};
  }
}
