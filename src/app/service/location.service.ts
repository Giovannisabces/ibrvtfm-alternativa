import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Location[]> {
    return this.httpClient.get<Location[]>("https://zsc3axf6q8.execute-api.us-east-1.amazonaws.com/Dev/locations");
  }
}