import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Scooter} from "../models/scooter";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScooterRestAdaptorService {

  resourceUrl: string = "";

  constructor(private http: HttpClient) {
    this.resourceUrl = environment.BACKEND_URL + "/scooters"
    console.log("Created Scooter-REST-service-with-http for " + this.resourceUrl);
  }

  async asyncFindAll(): Promise<Scooter[]> {
    return null;
  }

  async asyncFindById(id: number): Promise<Scooter> {
    return null;
  }

  async asyncSave(scooter): Promise<Scooter> {
    let response0: Observable<Scooter>;
    // distinguish new scooters from updates of existing Scooters
    if(scooter.id == 0){
      response0 =
        this.http.post<Scooter>(this.resourceUrl, scooter).pipe(shareReplay(1));
    } else {
      response0 =
        this.http.put<Scooter>(`${this.resourceUrl}/${scooter.id}`, scooter).pipe(shareReplay(1));
    }
  // log the error, if any. observables can have multiple subscribers
  // but the http request shall be shared for that
  response0.subscribe((scooter: Scooter) =>{}, error => console.log(error));

  // await resolution of the observable
  // and convert the json object to a proper Scooter instance
  const savedScooter = Scooter.copyConstructor(await response0.toPromise());
  console.log('Scooter-RestAdaptorWithHttp.asyncSave result: ', savedScooter);

  //will be delivered as a promise such that the caller can await this method
  return savedScooter;
  }

async asyncDeleteById(id){}

}