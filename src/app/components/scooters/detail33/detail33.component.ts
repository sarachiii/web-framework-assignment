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
  set selectedScooterFromOverview(scooter: Scooter) {
    this._selectedScooterFromOverview = scooter;
    this.scooter = Scooter.copyConstructor(scooter);
  }

  get selectedScooterFromOverview(): Scooter {
    return this._selectedScooterFromOverview;
  }
  @Output() selectedScooterFromOverviewChange = new EventEmitter<Scooter>();
  private _selectedScooterFromOverview : Scooter;
  scooter: Scooter;
  clicked = false;

  constructor(private scootersService: ScootersService) {
  }

  ngOnInit(): void {
    // this.scooter = Scooter.copyConstructor(this.selectedScooterFromOverview);
  }

  onConfirm(){
    let changes: boolean = this.scooter.equalsTo(this.scootersService.findById(this.scooter.id));
    console.log('s',this.scooter)
    console.log('s2',this.scootersService.findById(this.scooter.id))
    console.log(changes)
    return changes && confirm("Are you sure you want to discard unsaved changes?");
  }

  onDelete(){
    if(this.onConfirm()) {
      this.scootersService.deleteById(this.scooter.id);
      this.selectedScooterFromOverview = <Scooter>{};
      this.selectedScooterFromOverviewChange.emit(this.selectedScooterFromOverview);
    }
  }

  onSave(){
    this.scootersService.save(this.scooter);
  }

  onClear(){
    if(confirm("Are you sure you want to discard unsaved changes?")) {
      if(this.scooter) {
        Object.assign(this.scooter, {
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
      // this.cancelSelected.emit(this.scooter);
      // this.selectedScooterFromOverview = this.scootersService.findById(this.scooter.id);
      this.selectedScooterFromOverviewChange.emit(this.scooter);
    }
  }

  onReset(){
    if(confirm("Are you sure you want to discard unsaved changes?")) {
      if (this.scooter) this.scooter = <Scooter>{...this.scootersService.findById(this.scooter.id)}
    }
  }
}
