import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ScooterRestAdaptorService} from "../../../services/scooter-rest-adaptor.service";

@Component({
  selector: 'app-scooters-detail37',
  templateUrl: '../detail34/detail34.component.html',
  styleUrls: ['../detail34/detail34.component.css'],
})
export class Detail37Component implements OnInit {

  editedScooter: Scooter;
  scooter: Scooter;
  private childParamsSubscription: Subscription;

  @Input()
  set selectedScooterFromOverview(scooter: Scooter) {
    this.scooter = Scooter.copyConstructor(scooter);
  }

  get selectedScooterFromOverview(): Scooter {
    return this._selectedScooterFromOverview;
  }

  @Output() selectedScooterFromOverviewChange = new EventEmitter<Scooter>();
  private _selectedScooterFromOverview: Scooter;

  constructor(private scooterRestAdaptorService: ScooterRestAdaptorService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.scooter = Scooter.copyConstructor(this._selectedScooterFromOverview);
  }

  ngOnInit(): void {
    this.activatedRoute
      .params
      .subscribe(async (params: Params) => {
        this.selectedScooterFromOverview = await this.scooterRestAdaptorService.asyncFindById(parseInt(params['id']));
        this.editedScooter = Scooter.copyConstructor(this.selectedScooterFromOverview);
      });
  }

  ngOnDestroy(): void {
    this.childParamsSubscription && this.childParamsSubscription.unsubscribe();
  }

  async onChanges() {
    return this.scooter.equalsTo(await this.scooterRestAdaptorService.asyncFindById(this.scooter.id));
  }

  async onConfirm() {
    if (await this.onChanges()) {
      return confirm("Are you sure you want to discard unsaved changes?");
    } else {
      return true;
    }
  }

  async onDelete() {
    if (this.scooter && this.onConfirm()) {
      await this.scooterRestAdaptorService.asyncDeleteById(this.scooter.id);
      this.routeTo();
    }
  }

  async onSave() {
    await this.scooterRestAdaptorService.asyncSave(this.scooter);
    this.routeTo();
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

  async onCancel() {
    if (this.scooter && this.onConfirm()) {
      this.scooter = await this.scooterRestAdaptorService.asyncFindById(this.scooter.id);
      this.routeTo();
    }
  }

  async onReset() {
    if (this.scooter && this.onConfirm()) {
      this.scooter = await this.scooterRestAdaptorService.asyncFindById(this.scooter.id);
    }
  }

  routeTo(): void {
    this.router.navigate(['../../scooters/overview37'], {relativeTo: this.activatedRoute.parent})
      .catch(reason => console.error(reason));
  }
}
