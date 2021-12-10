import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SessionSbService {
  BROWSER_STORAGE_ITEM_NAME;
  RESOURCES_URL;


  constructor(private http: HttpClient) {
    this.BROWSER_STORAGE_ITEM_NAME = environment.BROWSER_STORAGE_ITEM_NAME;
    this.RESOURCES_URL = environment.BACKEND_URL + "/authentication";
    this.getTokenFromBrowserStorage();
    //console.log("SessionSbService recovered: token: ", this._currentToken)
  }

  //logs on to the backend, and retrieves user details and the JWT authentication token
  // from the backend.
  async asyncSignIn(email: string, password: string): Promise<User> {
    //make a request that returns a full response, includig the headers
    let response0 =
      this.http.post<HttpResponse<User>>(this.RESOURCES_URL + "/login",
        {email: email, password: password},
        {observe: "response"}).pipe(shareReplay(1));

    // await resolution of the observable and catch errors, if any
    let response = await response0.toPromise()
      .catch(error => {
        console.log(error);
        this.singOut();
        return null
      });

    let user = (response?.body as unknown as User);

    let token = this.getTokenFromBrowserStorage();
    this.saveTokenIntoBrowserStorage(token, user);

    //return a Promise<User> that the caller can await for
    return user;
  }

  //discards user details and the JWT authentication token from the service
  singOut() {

  }

  //saves the JWT authentication token and user details into the service and browser
  // storage for automatic retrieval after application or page reload
  saveTokenIntoBrowserStorage(token: string, user: User) {
    let newValue = JSON.stringify({token: token, user: user});
    window.sessionStorage.setItem(this.BROWSER_STORAGE_ITEM_NAME, newValue);
    window.localStorage.setItem(this.BROWSER_STORAGE_ITEM_NAME, newValue);
  }

  //retrieves the JWT authentication token and user details from the browser storage
  //into the service after application of page reload
  getTokenFromBrowserStorage(): string {
    return "";
  }
}
