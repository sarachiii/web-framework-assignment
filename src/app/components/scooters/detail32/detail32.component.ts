import { Component, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'app-scooters-detail32',
  templateUrl: './detail32.component.html',
  styleUrls: ['./detail32.component.css']
})
export class Detail32Component implements OnInit {
  @Input() selectedScooterFromOverview;
 // @Output() onDelete
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){

  }

}
