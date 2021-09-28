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
  @Input() public _selectedScooterFromOverview : Scooter;
  @Output() selectedScooterEmitter = new EventEmitter<Scooter>();
  @Output() deletedSelected = new EventEmitter<Scooter>();
  @Output() cancelSelected = new EventEmitter<Scooter>();
  @Output() resetSelected = new EventEmitter<Scooter>();
  @Output() clearSelected = new EventEmitter<Scooter>();
  @Output() saveSelected = new EventEmitter<Scooter>();
  scooter: Scooter;
  clicked = false;

  constructor(private scootersService: ScootersService) {
    this.scooter = Scooter.copyConstructor(this._selectedScooterFromOverview);
  }

  ngOnInit(): void {
  }

  onDelete(){
    if(confirm("Are you sure you want to discard unsaved changes?")) {
      this.deletedSelected.emit(this._selectedScooterFromOverview);
    }
  }

  onSave(){
    this.saveSelected.emit(this._selectedScooterFromOverview);
  }

  onClear(){
    if(confirm("Are you sure you want to discard unsaved changes?")) {
      if(this._selectedScooterFromOverview) {
        Object.assign(this._selectedScooterFromOverview, {
          tag: "",
          status: "",
          gpsLocation: "",
          mileage: 0,
          batteryCharge: 0
        })
      }
    }
  }

  onCancel(){
    if(confirm("Are you sure you want to discard unsaved changes?")) {
      this.cancelSelected.emit(this._selectedScooterFromOverview);
    }
  }

  onReset(){
    if(confirm("Are you sure you want to discard unsaved changes?")) {
      if (this._selectedScooterFromOverview) this._selectedScooterFromOverview = <Scooter>{...this.scootersService.findById(this._selectedScooterFromOverview.id)}
    }
  }

  set selectedScooterFromOverview(value: Scooter) {
    this._selectedScooterFromOverview = value;
  }

  get selectedScooterFromOverview(): Scooter {
    return this._selectedScooterFromOverview;
  }
}
