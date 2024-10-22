import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sprint } from '../models/sprint';

const baseUrl = 'http://localhost:8080/api/sprints';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id: number) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data : Sprint) {
    console.log("posting : ", data)
    return this.http.post(baseUrl, data);
  }

  update(id : number, data: Sprint) {
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