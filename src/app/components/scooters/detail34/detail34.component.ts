import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-scooters-detail34',
  templateUrl: './detail34.component.html',
  styleUrls: ['./detail34.component.css'],
  providers: [ScootersService]
})
export class Detail34Component implements OnInit {
  @Input() public _selectedScooterFromOverview : Scooter;
  @Output() selectedScooterEmitter = new EventEmitter<Scooter>();
  @Output() deletedSelected = new EventEmitter<Scooter>();
  @Output() cancelSelected = new EventEmitter<Scooter>();
  @Output() resetSelected = new EventEmitter<Scooter>();
  @Output() clearSelected = new EventEmitter<Scooter>();
  @Output() saveSelected = new EventEmitter<Scooter>();
  scooter: Scooter;
  clicked = false;
  private childParamsSubscription : Subscription;

  constructor(private scootersService: ScootersService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.scooter = Scooter.copyConstructor(this._selectedScooterFromOverview);
  }

  ngOnInit(): void {
    this.childParamsSubscription =
      this.activatedRoute.params
        .subscribe((params: Params) => {

          this._selectedScooterFromOverview = params['id'];
        })
  }

  ngOnDestroy(): void{
    this.childParamsSubscription && this.childParamsSubscription.unsubscribe();
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

  set selectedScooterFromOverview(scooter: Scooter) {
    this._selectedScooterFromOverview = scooter;
  }

  get selectedScooterFromOverview(): Scooter {
    return this._selectedScooterFromOverview;
  }
}
