import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";

@Component({
  selector: 'app-scooters-detail33',
  templateUrl: './detail33.component.html',
  styleUrls: ['./detail33.component.css'],
  providers: [ScootersService]
})
export class Detail33Component implements OnInit {
  @Input() selectedScooterFromOverview : Scooter;
  @Output() deletedSelected = new EventEmitter<Scooter>();
  @Output() cancelSelected = new EventEmitter<Scooter>();
  @Output() resetSelected = new EventEmitter<Scooter>();
  @Output() clearSelected = new EventEmitter<Scooter>();
  @Output() saveSelected = new EventEmitter<Scooter>();

  constructor(private scootersService: ScootersService) {}

  ngOnInit(): void {
  }

  onDelete(){
    this.deletedSelected.emit(this.selectedScooterFromOverview);
  }

  onCancel(){
    this.cancelSelected.emit(this.selectedScooterFromOverview);
  }

  onReset(){
    this.resetSelected.emit(this.selectedScooterFromOverview);
  }

  onSave(){
    this.saveSelected.emit(this.selectedScooterFromOverview);
  }

  onClear(){
    this.clearSelected.emit(this.selectedScooterFromOverview)
  }

}
