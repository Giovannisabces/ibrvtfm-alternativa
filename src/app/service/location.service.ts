import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Location } from '../models/location';
import { ResponseLocation } from '../components/shared/interfaces/ResponseLocation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<ResponseLocation> {
    return this.httpClient.get<ResponseLocation>("https://zsc3axf6q8.execute-api.us-east-1.amazonaws.com/Dev/locations")
  }
}