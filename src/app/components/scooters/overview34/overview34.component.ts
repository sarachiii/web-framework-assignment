import { Component, OnInit } from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";

@Component({
  selector: 'app-overview34',
  templateUrl: './overview34.component.html',
  styleUrls: ['./overview34.component.css'],
  providers: [ScootersService]
})

export class Overview34Component implements OnInit {

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

  onDelete(selectedScooter: Scooter) {
    this.scootersService.deleteById(selectedScooter.id);
    this.selectedScooter = <Scooter>{};
  }

  onSave(scooter: Scooter){
    this.scootersService.save(scooter);
    this.selectedScooter = <Scooter>{};
  }

  onCancel(){
    this.selectedScooter = <Scooter>{};
  }
}
