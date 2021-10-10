import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-scooters-detail34',
  templateUrl: './detail34.component.html',
  styleUrls: ['./detail34.component.css'],
})
export class Detail34Component implements OnInit {
  scooter: Scooter;
  clicked = false;

  @Input()
  set selectedScooterFromOverview(scooter: Scooter) {
    this.scooter = Scooter.copyConstructor(scooter);
  }

  get selectedScooterFromOverview(): Scooter {
    return this._selectedScooterFromOverview;
  }

  @Output() selectedScooterFromOverviewChange = new EventEmitter<Scooter>();
  private _selectedScooterFromOverview: Scooter;

  @Output() unselectedEvent = new EventEmitter<Scooter>();

  constructor(private scootersService: ScootersService) {
  }

  ngOnInit(): void {
  }

  onChanges() {
    return this.scooter.equalsTo(this.scootersService.findById(this.scooter.id));
  }

  onConfirm() {
    return !this.onChanges ? confirm("Are you sure you want to discard unsaved changes?") : true;
  }

  onDelete() {
    if (this.onConfirm()) {
      this.scootersService.deleteById(this.scooter.id);
      this.unselectedEvent.emit(this.scooter);
    }
  }

  onSave() {
    this.scootersService.save(this.scooter);
    this.unselectedEvent.emit(this.scooter);
  }

  onClear() {
    if (this.onConfirm()) {
      Object.assign(this.scooter, {
        tag: "",
        status: "",
        gpsLocation: "",
        mileage: 0,
        batteryCharge: 0
      })
    }
  }

  onCancel() {
    if (this.onConfirm()) {
      this.scooter = this.scootersService.findById(this.scooter.id);
      this.unselectedEvent.emit(this.scooter);
    }
  }

  onReset() {
    if (this.onConfirm()) {
      this.scooter = this.scootersService.findById(this.scooter.id);
    }
  }
}
