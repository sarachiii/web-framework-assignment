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

  pId: number = 30000;
  clicked: boolean = false;
  selectedScooter: Scooter = <Scooter>{};

  constructor(private scootersService: ScootersService) {}

  ngOnInit() {
    this.scooters;
  }

  findById(id: number): Scooter {
    return this.scootersService.findById(id);
  }

  get scooters(): Scooter[]{
    return this.scootersService.findAll();
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
  }

  onDelete(selectedScooter: Scooter) {
    this.scootersService.deleteById(selectedScooter.id);
    this.selectedScooter = <Scooter>{};
  }

  onSave(scooter: Scooter){
    this.scootersService.save(scooter);
  }
}
