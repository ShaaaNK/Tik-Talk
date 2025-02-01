import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, switchMap, throwError} from "rxjs";

let isRefreshing = false;
export const authTokenInterceptor: HttpInterceptorFn = (req, next) =>{
  const accessToken = inject(AuthService).access_token
  const authService = inject(AuthService)
  if (!accessToken) return next(req);
  if (isRefreshing) {
    return refreshAndProceed(authService, req, next);
  }
  req = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return next(addToken(req, accessToken)).pipe(
    //dodelat' perehvatchik
    catchError(error => {
      if (error.status ===403) {

        return refreshAndProceed(authService, req, next);

      }
      return throwError(error);
    }
  ))
}

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn) => {
  if (!isRefreshing) {
    isRefreshing=true
    return authService.refreshAuthToken()
      .pipe(
        switchMap(res=>{
          isRefreshing=false;
          return next(addToken(req, res.access_token))
        })
      )
  }
  return next(addToken(req, authService.access_token))
  // return AuthService.refreshAuthToken()
  //   .pipe(
  //     switchMap(token => {
  //       return next(req)
  //     })
  //   )

}
const addToken = (req:HttpRequest<any>, accessToken: string |null ) => {
  return req.clone({
    setHeaders: {
      'Authorization': `Bearer ${accessToken}`
    }
})
}
