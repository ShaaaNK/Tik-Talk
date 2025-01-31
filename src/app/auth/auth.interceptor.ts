import { HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError} from "rxjs";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) =>{
  const accessToken = inject(AuthService).access_token
  if (!accessToken) return next(req);
  req = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return next(req).pipe(
    //dodelat' perehvatchik
    catchError(err => next(err))
  )
}
