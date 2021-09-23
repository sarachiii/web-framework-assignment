import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Scooter} from "../../../models/scooter";

@Component({
  selector: 'app-scooters-detail32',
  templateUrl: './detail32.component.html',
  styleUrls: ['./detail32.component.css']
})
export class Detail32Component implements OnInit {
  @Input() selectedScooterFromOverview : Scooter;
  @Output() deletedSelected = new EventEmitter<Scooter>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    this.deletedSelected.emit(this.selectedScooterFromOverview);
  }
}
