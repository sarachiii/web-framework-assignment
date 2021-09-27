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
  // @Output() saveSelected = new EventEmitter<Scooter>();
  @Output() saveSelected = new EventEmitter<{pId: number, tag: string, gpsLocation: string, mileage: number, batteryCharge: number}>();

  constructor(private scootersService: ScootersService) {}

  ngOnInit(): void {
  }

  onDelete(){
    this.deletedSelected.emit(this.selectedScooterFromOverview);
    // this.scootersService.deleteById(this.selectedScooterFromOverview.id)
  }

  onCancel(){
    this.cancelSelected.emit(this.selectedScooterFromOverview);
  }

  onReset(){
    this.resetSelected.emit(this.selectedScooterFromOverview);
  }

  onSave(id: number, tag: string, location: string, mileage: number, battery: number){
    this.saveSelected.emit({
      pId: id,
      tag: tag,
      gpsLocation: location,
      mileage: mileage,
      batteryCharge: battery
    });
    this.selectedScooterFromOverview.id = id;
    this.selectedScooterFromOverview.tag = tag;
    this.selectedScooterFromOverview.gpsLocation = location;
    this.selectedScooterFromOverview.mileage = mileage;
    this.selectedScooterFromOverview.batteryCharge = battery;
    console.log(this.selectedScooterFromOverview);
    this.scootersService.save(this.selectedScooterFromOverview);
  }

  onClear(){
    this.clearSelected.emit(this.selectedScooterFromOverview)
  }
}
