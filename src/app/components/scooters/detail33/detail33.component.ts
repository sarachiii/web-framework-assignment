import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";

@Component({
  selector: 'app-scooters-detail33',
  templateUrl: './detail33.component.html',
  styleUrls: ['./detail33.component.css'],
})
export class Detail33Component implements OnInit {
  @Input()
  get selectedScooterFromOverview(): Scooter {
    return this._selectedScooterFromOverview;
  }

  set selectedScooterFromOverview(scooter: Scooter) {
    this._selectedScooterFromOverview = scooter;
    this.scooter = Scooter.copyConstructor(scooter);
    console.log(scooter)
  }

  @Output() selectedScooterFromOverviewChange = new EventEmitter<Scooter>();
  private _selectedScooterFromOverview: Scooter;
  scooter: Scooter | null;
  clicked = false;

  constructor(private scootersService: ScootersService) {}

  ngOnInit(): void {
    // this.scooter = Scooter.copyConstructor(this.selectedScooterFromOverview);
  }

  onConfirm() {
    let changes: boolean = this.scooter.equalsTo(this.scootersService.findById(this.scooter.id));
    console.log('s', this.scooter)
    console.log('s2', this.scootersService.findById(this.scooter.id))
    console.log(changes)
    return changes && confirm("Are you sure you want to discard unsaved changes?");
  }

  onDelete() {
    if (this.onConfirm()) {
      this.scootersService.deleteById(this.scooter.id);
      this.selectedScooterFromOverview = <Scooter>{};
      this.selectedScooterFromOverviewChange.emit(this.selectedScooterFromOverview);
    }
  }

  onSave() {
    if (this.scooter) {
      this.scootersService.save(this.scooter);
    }
  }

  onClear() {
    if (confirm("Are you sure you want to discard unsaved changes?") && this.selectedScooterFromOverview) {
      Object.assign(this.selectedScooterFromOverview, {
        tag: "",
        status: "",
        gpsLocation: "",
        mileage: 0,
        batteryCharge: 0
      });
    }
  }

  onCancel() {
    if (confirm("Are you sure you want to discard unsaved changes?")) {
      this.selectedScooterFromOverviewChange.emit(<Scooter>{});
    }
  }

  onReset() {
    if (confirm("Are you sure you want to discard unsaved changes?")) {
      this.selectedScooterFromOverview = this.scooter;
      // if (this.scooter) this.scooter = <Scooter>{...this.scootersService.findById(this.scooter.id)}
    }
  }
}
