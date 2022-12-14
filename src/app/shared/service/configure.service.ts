import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigureService {
  public pIn:number=0;
  constructor( private router: Router) {

   }

  UserName()
   {
       return  localStorage.getItem("userName");
   }

   UserGroup()
   {
       return  localStorage.getItem("userGroup");
   }
   UserToken()
   {
       return localStorage.getItem("token");
   }

   IsAuthentecated()
   {
     if(!this.UserToken() || !this.UserName()  )
     {
      this.router.navigateByUrl('/login');
     }
   }

   Logout()
   {


    localStorage.removeItem("userGroup");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    this.router.navigateByUrl('/login');

   }
}
