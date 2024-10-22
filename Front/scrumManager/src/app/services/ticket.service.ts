import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TicketScrum } from '../models/ticket-scrum';

const baseUrl = 'http://localhost:8080/api/tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id: number) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data : TicketScrum) {
    return this.http.post(baseUrl, data);
  }

  update(id : number, data: TicketScrum) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id : number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByTitle(title : string) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}