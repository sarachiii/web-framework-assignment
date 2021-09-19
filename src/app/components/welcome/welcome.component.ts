import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  scooterText = "";
  dropDownText = "";
  dropDownTextItem = "";

  ngOnInit(): void {
  }

  onClickDropdown() {
    this.dropDownText = "";
  }

  onClickLime() {
    this.scooterText = "Lime is your ideal carbon-free option for any trip, any time, anywhere.";
    event.preventDefault();
  }

  onClickLink() {
    this.scooterText = "Link is your ideal carbon-free option for any trip, any time, anywhere.";
    event.preventDefault();
  }

  onClickTier() {
    this.scooterText = "Tier is your ideal carbon-free option for any trip, any time, anywhere.";
    event.preventDefault();
  }

  onClickBird() {
    this.scooterText = "Bird is your ideal carbon-free option for any trip, any time, anywhere.";
    event.preventDefault();
  }
}
