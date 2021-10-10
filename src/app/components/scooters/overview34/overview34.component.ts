import { Component, OnInit } from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-overview34',
  templateUrl: './overview34.component.html',
  styleUrls: ['./overview34.component.css'],
})

export class Overview34Component implements OnInit {
  selectedScooter: Scooter = <Scooter>{};

  constructor(private scootersService: ScootersService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedScooter.id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.selectedScooter.id = params['id'];
        }
      );

    this.activatedRoute
      .firstChild?.params
      .subscribe((params: Params) => {
        this.selectedScooter =
          this.scooters.find(c => c.id == params.id)
      });
  }

  get scooters(): Scooter[] {
    return this.scootersService.findAll();
  }

  onAddScooter() {
    let newScooter = Scooter.createSampleScooter();
    this.scootersService.save(newScooter);
    this.onSelect(newScooter);
  }

  onSelect(scooter: Scooter){
    if (scooter != null && scooter.id != this.selectedScooter?.id){
      this.router.navigate([scooter.id], {relativeTo: this.activatedRoute})
        .catch(reason => console.error(reason));
    } else {
      this.router.navigate(['../overview34'], {relativeTo: this.activatedRoute})
        .catch(reason => console.error(reason));
    }
    //If the same scooter is clicked twice, unselect current scooter by emptying the list
    if(scooter.id === this.selectedScooter.id){
      this.selectedScooter = <Scooter>{};
    } else {
      this.selectedScooter = scooter;
    }
  }
}
