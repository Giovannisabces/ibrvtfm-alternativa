import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseApiGateway } from '../components/shared/interfaces/responseapigateway';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<ResponseApiGateway> {
    return this.httpClient.get<ResponseApiGateway>("https://zsc3axf6q8.execute-api.us-east-1.amazonaws.com/Dev/locations")
  }
}