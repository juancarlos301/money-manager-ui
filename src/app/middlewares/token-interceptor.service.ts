import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._authService.getSession();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
    // .pipe(
    //   catchError((err: HttpErrorResponse) => {

    //     if (err.status === 401) {
    //       this.router.navigateByUrl('/login');
    //     }

    //     return throwError( err );

    //   })
  }
}
