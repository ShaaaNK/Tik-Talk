import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthResponse} from "../data/interfaces/auth.interface";
import {catchError, tap, throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  router = inject(Router)
  baseApiUrl = 'http://127.0.0.1:5001/api/v1/login/auth/';
  cookieService = inject(CookieService)
  access_token: string | null = null;
  refresh_token: string | null = null;
  user_id: number | null = null;

  get isAuth(){
    if(!this.access_token){
      this.access_token = this.cookieService.get('access_token');
      this.refresh_token = this.cookieService.get('refresh_token');
    }
    return !!this.access_token;
  }

  login(payload:{username:string, password:string}){
    const fd = new FormData();
    fd.append('login', payload.username);
    fd.append('password', payload.password);
    return this.http.post<AuthResponse>(`${this.baseApiUrl}`, fd).pipe(
      tap(val=>{
        this.access_token = val.access_token;
        this.refresh_token = val.refresh_token;
        this.user_id = val.user_id;
        this.cookieService.set('access_token', this.access_token);
        this.cookieService.set('refresh_token', this.refresh_token);

      })
    )
  }
  refreshAuthToken(){
    return this.http.post<AuthResponse>(`${this.baseApiUrl}/refresh_token`, {
      refresh_token: this.refresh_token

    }).pipe(
      catchError(err => {
        this.logout()
        return throwError(err);
      })
    )

  }
  logout(){
    this.cookieService.deleteAll()
    this.access_token = null;
    this.refresh_token = null;
    this.user_id = null;
    this.router.navigate(['/login']);
  }


}
