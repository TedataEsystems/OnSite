import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { SidenavComponent } from '../../component/sidenav/sidenav.component';
import { LayoutComponent } from '../../component/layout/layout.component';
import { LoadingPageComponent } from '../../component/loading-page/loading-page.component';
import { ErrorPageComponent } from '../../component/error-page/error-page.component';
import { DeleteMsgComponent } from '../../component/delete-msg/delete-msg.component';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from 'src/app/interseptors/loading.interceptor';





@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidenavComponent,
    LoadingPageComponent,
    ErrorPageComponent,
    DeleteMsgComponent,
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),


  ],
  providers:[{provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true}]
})
export class LayoutModule { }
