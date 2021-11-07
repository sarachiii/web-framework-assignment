import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Scooter} from "../models/scooter";
import {environment} from "../../environments/environment";
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScooterRestAdaptorService {
  private lastId: number = 30000;
  public scooters: Scooter[] = [];
  resourceUrl: string = "";

  constructor(private http: HttpClient) {
    this.resourceUrl = environment.BACKEND_URL + "/scooters"
    this.populateScooters();
  }

  restGetScooters(): Observable<Scooter[]> {
    return this.http.get<Scooter[]>(this.resourceUrl).pipe(catchError(this.handleError));
  }

  populateScooters(): void {
    this.restGetScooters().subscribe((scooters: Scooter[]) => {
      let scootersArray = scooters.map(scooter => Scooter.copyConstructor(scooter));
      for (let i = 0; i < scooters.length; i++) {
        this.scooters.push(scootersArray[i]); //adds one scooter at a time to the scooters list
      }
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  restPostScooter(scooter): Observable<Scooter> {
    this.scooters.push(scooter);
    return this.http.post<Scooter>(this.resourceUrl, scooter);
  }

  restPutScooter(scooter): Observable<Scooter> {
    return this.http.put<Scooter>(`${this.resourceUrl}/${scooter.id}`, scooter);
  }

  restDeleteScooter(scooterId): void {
    this.http.delete<Scooter>(`${this.resourceUrl}/${scooterId}`).subscribe();
  }

  public findAll(): Scooter[] {
    return this.scooters;
  }

  public findById(id: number): Scooter | null {
    return this.scooters.find(scooter => scooter.id == id) || null;
  }

  public save(scooter: Scooter): Scooter {
    if (scooter.id === 0) {
      scooter.id = this.nextId();
      this.restPostScooter(scooter).toPromise().then(scooter => {
        this.scooters.push(scooter);
      });
    } else {
      for (let i = 0; i < this.scooters.length; i++) {
        if (this.scooters[i].id == scooter.id) {
          this.scooters[i] = scooter;
          this.restPutScooter(scooter);
        }
      }
    }
    return scooter;
  }

  public deleteById(id: number) {
    this.restDeleteScooter(id);
    this.scooters.splice(this.scooters.findIndex(scooter => scooter.id == id), 1);
  }

  private nextId(): number {
    return this.lastId++;
  }
}
