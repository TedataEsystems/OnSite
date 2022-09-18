import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
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

getSubCatCountMttrToday(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
  let params = new HttpParams();
  if(PageNumber !== null && PageSize !== null){
    params = params.append('pageNumber' , PageNumber.toString());
    params = params.append('pageSize' , PageSize.toString());
    params = params.append('searchValue' , searchValue.toString());
    params = params.append('sortcolumn' , sortcolumn.toString());
    params = params.append('sortcolumndir' , sortcolumndir.toString());
  }
  return this.httpClient.get<any>(`${environment.apiUrl}OnsiteReport/GetSubCatCountMttrToday`  , {observe:'response' , params}).pipe(
    map(response => {
       return response.body ;
    })
  )
}

getClosureCountMttrToday(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
  let params = new HttpParams();
  if(PageNumber !== null && PageSize !== null){
    params = params.append('pageNumber' , PageNumber.toString());
    params = params.append('pageSize' , PageSize.toString());
    params = params.append('searchValue' , searchValue.toString());
    params = params.append('sortcolumn' , sortcolumn.toString());
    params = params.append('sortcolumndir' , sortcolumndir.toString());
  }
  return this.httpClient.get<any>(`${environment.apiUrl}OnsiteReport/GetClosureCountMttrToday`  , {observe:'response' , params}).pipe(
    map(response => {
       return response.body ;
    })
  )
}


}