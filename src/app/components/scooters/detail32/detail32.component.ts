import { Component, OnInit, Input, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";

@Component({
  selector: 'app-scooters-detail32',
  templateUrl: './detail32.component.html',
  styleUrls: ['./detail32.component.css']
})
export class Detail32Component implements OnInit {
  @Input() selectedScooterFromOverview : Scooter;
 // @Output() onDelete
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
  }


}
