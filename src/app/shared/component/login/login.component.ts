import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/Model/iuser';
import { Login } from 'src/app/Model/login';
import { AccountService } from 'src/app/services/account.service';
import { NotificationMsgService } from 'src/app/services/notification-msg.service';
import { ConfigureService } from '../../service/configure.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl?: string;
  form:FormGroup=new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  });
  warning=false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    public accountService: AccountService,

    )
    {
      //this.config.Logout();
      this.titleService.setTitle("Onsite Report| Login");
      let token = localStorage.getItem("token");
      if (token != "undefined" || token != null) {
        this.router.navigateByUrl('')
      }


    }
    user = <IUser>{};
    error: any;
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }



    onSubmit() {
      if (this.form.invalid) {
        return;
      }

      let loginview: Login =
      {
        userName: this.form.controls.username.value.trim(),
        password: this.form.controls.password.value,
      }

      this.accountService.Login(loginview).subscribe(res => {
        this.user = res;
        if ((this.user.token != "undefined" || this.user.token != null) && this.user.status != false) {
          this.warning=false;
          localStorage.setItem('token', this.user.token);
          localStorage.setItem('userName', this.user.userName);
          localStorage.setItem('userGroup', this.user.userGroup);
          // this.router.navigateByUrl('/');
          this.router.navigate([this.returnUrl]);
        }
        if (this.user.token == "undefined" || this.user.userName == "undefined" || this.user.token == null) {

          this.warning=true;

        }
        else if (this.user.status == false) {
          this.warning=true;
        }

      }
        , error => { this.warning=true; }
      );



    }

}
