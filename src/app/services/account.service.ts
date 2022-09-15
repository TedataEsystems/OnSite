import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IUser } from "../Model/iuser";
import { Login } from "../Model/login";


@Injectable({
  providedIn: 'root'
})

export class AccountService {
constructor(private httpClient:HttpClient) { }


  Login(model: Login):Observable<IUser>
  {
    return this.httpClient.post<any>(`${environment.apiUrl}account/login`,model);
  }

  logout(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}account/Logout`);
  }
}