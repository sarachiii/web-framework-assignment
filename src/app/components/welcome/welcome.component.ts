import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  scooterText = "";

  constructor() { }

  ngOnInit(): void {
  }

  onClickLime(){
    this.scooterText = "Lime is your ideal carbon-free option for any trip, any time, anywhere.";
  }
  onClickLink(){
    this.scooterText = "Link is your ideal carbon-free option for any trip, any time, anywhere.";
  }
  onClickTier(){
    this.scooterText = "Tier is your ideal carbon-free option for any trip, any time, anywhere.";
  }
  onClickBird(){
    this.scooterText = "Bird is your ideal carbon-free option for any trip, any time, anywhere.";
  }
}
