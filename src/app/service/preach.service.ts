import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preach } from '../models/preach';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreachService {

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Preach[]> {
    return this.httpClient.get<Preach[]>("https://zsc3axf6q8.execute-api.us-east-1.amazonaws.com/Dev/preach");
  }
}