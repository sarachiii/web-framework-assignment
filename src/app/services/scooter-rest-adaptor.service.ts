import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Scooter} from "../models/scooter";
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
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
    let response0: Observable<Scooter[]> = this.http.get<Scooter[]>(this.resourceUrl);

    console.log(response0)
    response0.subscribe((scooters: Scooter[]) => {
    }, error => console.log(error));

    let scooters = [];
    response0.subscribe(async data => {
      console.log(data)
        for (let i = 0; i < data.length; i++) {
          scooters[i] = Scooter.copyConstructor(data[i]); //TODO 1 item uit array pakken ipv alles
          console.log(data[i])
        }
    })
    return scooters;
  }

  async asyncFindById(id: number): Promise<Scooter> {
    let response0: Observable<Scooter> = this.http.get<Scooter>(`${this.resourceUrl}/${id}`);
    // console.log(response0)
    response0.subscribe((scooter: Scooter) => {
    }, error => console.log(error));
    return Scooter.copyConstructor(await response0.toPromise());
    //iets van een stop criteria toevoegen? --> pagina blijft laden...
  }

  async asyncSave(scooter): Promise<Scooter> {
    let response0: Observable<Scooter>;
    // distinguish new scooters from updates of existing Scooters
    if (scooter.id == 0) {
      response0 =
        this.http.post<Scooter>(this.resourceUrl, scooter).pipe(shareReplay(1));
    } else {
      response0 =
        this.http.put<Scooter>(`${this.resourceUrl}/${scooter.id}`, scooter).pipe(shareReplay(1));
    }
    // log the error, if any. observables can have multiple subscribers
    // but the http request shall be shared for that
    response0.subscribe((scooter: Scooter) => {
    }, error => console.log(error));

    // await resolution of the observable
    // and convert the json object to a proper Scooter instance
    const savedScooter = Scooter.copyConstructor(await response0.toPromise());
    console.log('Scooter-RestAdaptorWithHttp.asyncSave result: ', savedScooter);

    //will be delivered as a promise such that the caller can await this method
    return savedScooter;
  }

  async asyncDeleteById(id) {
    let response0: Observable<Scooter> = this.http.delete<Scooter>(`${this.resourceUrl}/${id}`);
    console.log(response0);
    response0.subscribe((scooter: Scooter) => {
    }, error => console.log(error));
    // return Scooter.copyConstructor(await response0.toPromise());

    return null;
  }

}
