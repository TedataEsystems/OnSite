import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})

export class OnsiteReportService {
constructor(private httpClient:HttpClient) { }


getToday():Observable<any>
{
  return this.httpClient.get<any>(`${environment.apiUrl}OnsiteReport/GetCountToday`);
}

getCurrentMonth(): Observable<any> {
  return this.httpClient.get<any>(`${environment.apiUrl}OnsiteReport/GetCountCurrentMonth`);
}
getLastMonth(): Observable<any> {
  return this.httpClient.get<any>(`${environment.apiUrl}OnsiteReport/GetCountLastMonth`);
}

getCurrentYear(): Observable<any> {
  return this.httpClient.get<any>(`${environment.apiUrl}OnsiteReport/GetCountCurrentYear`);
}


}