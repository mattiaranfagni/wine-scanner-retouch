import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpclientrequesterService {
  readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  getAllDeps(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + '/department/');
  }

  getAllVints(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + '/vintage/');
  }

  request(year): Observable<any> {
    const body = new HttpParams()
      .set('startDate', "01/01/2006")
      .set('endDate', "01/01/2019")
      .set('forecastYear',year);
  
    return this.http.post(this.baseUrl+'/WinePredictionREST/ajax/getForecast',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).pipe(timeout(30000));
  }
}

