import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../shared/service/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loader :LoaderService) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {



    if (request.method === 'GET' ) {
      return next.handle(request);
    }

    this.loader.busy();
    return next.handle(request).pipe(
      finalize(() => {
        this.loader.idle();
      })
    );
  }
}
