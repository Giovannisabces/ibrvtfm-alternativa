import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Book[]> {
    return this.httpClient.get<Book[]>("https://zsc3axf6q8.execute-api.us-east-1.amazonaws.com/Dev/book");
  }
}