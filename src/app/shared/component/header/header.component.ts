import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { NotificationMsgService } from 'src/app/services/notification-msg.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Output() public sidenavToggle = new EventEmitter();
  //constructor(private router :Router) { }
constructor( private router :Router,private accountService : AccountService,private notificationService:ToastrService) { }
UserName:any="";
ngOnInit(): void {
// this.UserName=this.conser.UserName();
}


logOut(){
  localStorage.clear();
  this.accountService.logout().subscribe(res=>{
    this.router.navigateByUrl('/login');
  }
  ,error=>{this.notificationService.error('An Error Occured ')}
  );

}
public onToggleSidenav=()=> {
this.sidenavToggle.emit();
}

}
