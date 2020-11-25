import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  getSms(): Observable<any> {
    return this.http.get("http://api.grupolirios.com.br/sms").pipe(map((response: any) => {
      return response;
    }));
  }

  sendEmail(email): Observable<any> {
    return this.http.post("http://api.grupolirios.com.br/sms/email", email).pipe(map(response => {
      return response;
    }, catchError((error) => {
      return Observable.create(observer => {
        observer.next('erro_inesperado');
        observer.complete();
      });
    })));
  }

  salvarSms(sms): Observable<any> {
    return this.http.post("http://api.grupolirios.com.br/sms", sms).pipe(map(response => {
      return response;
    }, catchError((error) => {
      return Observable.create(observer => {
        observer.next('erro_inesperado');
        observer.complete();
      });
    })));
  }
}
