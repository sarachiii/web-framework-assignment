import { Component, OnInit } from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-overview34',
  templateUrl: './overview34.component.html',
  styleUrls: ['./overview34.component.css'],
  providers: [ScootersService]
})

export class Overview34Component implements OnInit {

  selectedScooter: Scooter = <Scooter>{};

  constructor(private scootersService: ScootersService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.selectedScooter.id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.selectedScooter.id = params['id'];
        }
      );
  }

  get scooters(): Scooter[]{
    return this.scootersService.findAll();
  }

  onSelect(scooter: Scooter){

    //If the same scooter is clicked twice, unselect current scooter by emptying the list
    if(scooter.id === this.selectedScooter.id){
      this.selectedScooter = <Scooter>{};
    } else {
      this.selectedScooter = scooter;
    }

    if (scooter != null && scooter.id != this.selectedScooter?.id){
      this.router.navigate([scooter.id], {relativeTo: this.activatedRoute});
      console.log("Test1")
    } else {
      //TODO navigate to the parent path to unselect the selectedScooter
      console.log("You clicked the same scooter");
      // this.selectedScooter = <Scooter>{};
    }
  }

  onAddScooter() {
    let newScooter = Scooter.createSampleScooter();
    this.scootersService.save(newScooter);
    this.onSelect(newScooter);
  }
  //
  // onSelect(scooter: Scooter): void {
  //   if(scooter.id === this.selectedScooter.id){
  //     this.selectedScooter = <Scooter>{};
  //   } else {
  //     this.selectedScooter = scooter;
  //   }
  // }

  onDelete(selectedScooter: Scooter) {
    this.scootersService.deleteById(selectedScooter.id);
    this.selectedScooter = <Scooter>{};
  }

  onSave(scooter: Scooter){
    this.scootersService.save(scooter);
    this.selectedScooter = <Scooter>{};
  }

  onCancel(){
    this.selectedScooter = <Scooter>{};
  }
}
