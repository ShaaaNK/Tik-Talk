import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  getTestAcc() {
    return this.http.get(`${this.baseApiUrl}account/test_accounts`)
  }
}
