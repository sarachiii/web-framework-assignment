import {Component, OnInit} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-scooters-detail34',
  templateUrl: './detail34.component.html',
  styleUrls: ['./detail34.component.css'],
})
export class Detail34Component implements OnInit {

  scooter: Scooter;
  private _editedScooterId: number;
  private childParamsSubscription : Subscription;

  set editedScooterId(id: number) {
    this._editedScooterId = id;
    this.scooter = Scooter.copyConstructor(this.scootersService.findById(id));
  }

  constructor(private scootersService: ScootersService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.scooter = <Scooter>{};
  }

  ngOnInit(): void {
    this.childParamsSubscription =
      this.activatedRoute.params
        .subscribe((params: Params) => {
          this.editedScooterId = params['id'];
    })
  }

  ngOnDestroy(): void{
    this.childParamsSubscription && this.childParamsSubscription.unsubscribe();
  }

  onEdit() {
    return this.scooter.equalsTo(this.scootersService.findById(this.scooter.id));
  }

  onConfirm() {
    if(this.onEdit()){
      return confirm("Are you sure you want to discard unsaved changes?");
    } else {
      return true;
    }
  }

  onDelete() {
    if (this.scooter && this.onConfirm()) {
      this.scootersService.deleteById(this.scooter.id);
      this.routeTo();
    }
  }

  onSave() {
    this.scootersService.save(this.scooter);
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

  onCancel() {
    if (this.scooter && this.onConfirm()) {
      this.scooter = this.scootersService.findById(this.scooter.id);
      this.routeTo();
    }
  }

  onReset() {
    if (this.scooter && this.onConfirm()) {
      this.scooter = this.scootersService.findById(this.scooter.id);
    }
  }

  routeTo(): void {
    this.router.navigate(['../../scooters/overview34'], { relativeTo: this.activatedRoute.parent })
      .catch(reason => console.error(reason));
  }
}
