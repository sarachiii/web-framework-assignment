import { Injectable } from '@angular/core';
import {Scooter} from "../models/scooter";

@Injectable({
  providedIn: 'root'
})
export class ScootersService {
  private lastId: number = 30000;
  public scooters: Scooter[] = [];

  constructor() {
    for (let i = 0; i < 8; i++) {
      this.save(Scooter.createSampleScooter(0));
    }
  }

  public findAll(): Scooter[]{
    return this.scooters;
  }

  public findById(id: number): Scooter | null {
    return this.scooters.find(scooter => scooter.id == id) || null;
  }

  public save(scooter: Scooter): Scooter{
    if (scooter.id === 0) {
      scooter.id = this.nextId();
      this.scooters.push(scooter);
    } else {
      for (let i = 0; i < this.scooters.length; i++) {
        if (this.scooters[i].id == scooter.id) {
          this.scooters[i] = scooter;
        }
      }
    }
    return scooter;
  }

  public deleteById(id: number){
    this.scooters = this.scooters.filter(scooter => scooter.id != id);
  }

  private nextId(): number {
    return this.lastId += 3;
  }
}
