import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Overview34Component} from "../overview34/overview34.component";

@Component({
  selector: 'app-scooters-detail34',
  templateUrl: './detail34.component.html',
  styleUrls: ['./detail34.component.css'],
})
export class Detail34Component implements OnInit {

  scooter: Scooter;
  private childParamsSubscription : Subscription;

  @Input()
  set selectedScooterFromOverview(scooter: Scooter) {
    this.scooter = Scooter.copyConstructor(scooter);
  }

  get selectedScooterFromOverview(): Scooter {
    return this._selectedScooterFromOverview;
  }

  @Output() selectedScooterFromOverviewChange = new EventEmitter<Scooter>();
  private _selectedScooterFromOverview: Scooter;

  constructor(private scootersService: ScootersService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.scooter = Scooter.copyConstructor(this._selectedScooterFromOverview);
  }

  ngOnInit(): void {
    this.childParamsSubscription =
      this.activatedRoute.params
        .subscribe((params: Params) => {
          this.selectedScooterFromOverview = this.scootersService.findById(parseInt(params['id']));
    })
  }

  ngOnDestroy(): void{
    this.childParamsSubscription && this.childParamsSubscription.unsubscribe();
  }

  onChanges() {
    return this.scooter.equalsTo(this.scootersService.findById(this.scooter.id));
  }

  onConfirm() {
    return !this.onChanges ? confirm("Are you sure you want to discard unsaved changes?") : true;
  }

  onDelete() {
    if (this.scooter && this.onConfirm()) {
      this.scootersService.deleteById(this.scooter.id);
      this.routeTo(-1)
    }
  }

  onSave() {
    this.scootersService.save(this.scooter);
  }

  onClear() {
    if (this.scooter && this.onConfirm()) {
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
    if (this.scooter && this.onConfirm()) {
      this.scooter = this.scootersService.findById(this.scooter.id);

      this.routeTo('../../scooters/overview34/0');
    }
  }

  onReset() {
    if (this.scooter && this.onConfirm()) {
      this.scooter = this.scootersService.findById(this.scooter.id);
    }
  }

  routeTo(path: string | number): void {
    this.router.navigate([path], { relativeTo: this.activatedRoute.parent })
      .catch(reason => console.error(reason));
  }
}
