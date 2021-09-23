import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";

@Component({
  selector: 'app-scooters-detail33',
  templateUrl: './detail33.component.html',
  styleUrls: ['./detail33.component.css']
})
export class Detail33Component implements OnInit {

  @Input() selectedScooterFromOverview : Scooter;
  @Output() deletedSelected = new EventEmitter<Scooter>();

  constructor() {
    // @Inject(ScootersService)
  }

  ngOnInit(): void {
  }

  onDelete(){
    this.deletedSelected.emit(this.selectedScooterFromOverview);
  }

}
