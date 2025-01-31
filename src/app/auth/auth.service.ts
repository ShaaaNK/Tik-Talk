import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthResponse} from "../data/interfaces/auth.interface";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseApiUrl = 'http://127.0.0.1:5001/api/v1/login/auth/';

  access_token: string | null = null;
  refresh_token: string | null = null;
  user_id: number | null = null;

  get isAuth(){
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
      })
    )
  }
}
