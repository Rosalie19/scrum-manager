import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sprint } from '../models/sprint';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/sprints';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }

  /**
   * Gets all sprints
   * @returns Sprint[] : the list of sprints
   */
  getAll(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(baseUrl);
  }

  /**
   * Gets a sprint specified by its id
   * @param id number : id of the sprint to get
   * @returns Sprint : sprint corresponding to the id
   */
  get(id: number): Observable<Sprint> {
    return this.http.get<Sprint>(`${baseUrl}/${id}`);
  }

  /**
   * Creates a new sprint based on the input data
   * @param data Sprint : data of the new sprint
   * @returns Sprint : sprint posted
   */
  create(data: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(baseUrl, data);
  }

  /**
   * Updates an existing sprint
   * @param id number : id of the sprint to update
   * @param data Sprint : new sprint data
   * @returns Sprint : updated sprint data 
   */
  update(id: number, data: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${baseUrl}/${id}`, data);
  }

  /**
   * Deletes a sprint by its id 
   * @param id number : id of the sprint to delete
   * @returns /
   */
  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  /**
   * Find sprint by title
   * @param title string : title of the sprint to find
   * @returns Sprint : corresponding sprint
   */
  findByTitle(title: string): Observable<Sprint> {
    return this.http.get<Sprint>(`${baseUrl}?title=${title}`);
  }
}