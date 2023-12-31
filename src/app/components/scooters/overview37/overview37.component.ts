import {Component, OnInit} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ScooterRestAdaptorService} from "../../../services/scooter-rest-adaptor.service";

@Component({
  selector: 'app-overview37',
  templateUrl: '../overview34/overview34.component.html',
  styleUrls: ['../overview34/overview34.component.css'],
})

export class Overview37Component implements OnInit {
  selectedScooter: Scooter = <Scooter>{};
  scooters: Scooter[];

  constructor(private scooterRestAdaptorService: ScooterRestAdaptorService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.scooters = this.scooterRestAdaptorService.scooters;

    this.activatedRoute
      .firstChild?.params
      .subscribe((params: Params) => {
        this.selectedScooter = this.scooterRestAdaptorService.findById(params.id);
      });
  }

  onAddScooter() {
    let newScooter = Scooter.createSampleScooter();
    this.scooterRestAdaptorService.restPostScooter(newScooter);
    this.onSelect(newScooter);
  }

  onSelect(scooter: Scooter) {
    if (scooter != null && scooter.id != this.selectedScooter?.id) {
      this.router.navigate([scooter.id], {relativeTo: this.activatedRoute})
        .catch(reason => console.error(reason));
    } else {
      this.router.navigate(['../overview37'], {relativeTo: this.activatedRoute})
        .catch(reason => console.error(reason));
    }
    //If the same scooter is clicked twice, unselect current scooter by emptying the list
    if (scooter.id === this.selectedScooter.id) {
      this.selectedScooter = <Scooter>{};
    } else {
      this.selectedScooter = scooter;
    }
  }
}
