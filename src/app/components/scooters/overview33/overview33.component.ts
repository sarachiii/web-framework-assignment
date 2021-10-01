import {Component, OnInit} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";

@Component({
  selector: 'app-overview33',
  templateUrl: './overview33.component.html',
  styleUrls: ['./overview33.component.css'],
  providers: [ScootersService]
})
export class Overview33Component implements OnInit {

  selectedScooter: Scooter = <Scooter>{};

  constructor(private scootersService: ScootersService) {}

  ngOnInit() {
  }

  get scooters(): Scooter[]{
    return this.scootersService.findAll();
  }

  onAddScooter() {
    let newScooter = Scooter.createSampleScooter();
    this.scootersService.save(newScooter);
    this.onSelect(newScooter);
  }

  onSelect(scooter: Scooter): void {
    if(scooter.id === this.selectedScooter.id){
      this.selectedScooter = <Scooter>{};
    } else {
      this.selectedScooter = scooter;
    }
  }
}
