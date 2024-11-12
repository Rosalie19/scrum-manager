import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  /**
   * Gets all projects
   * @returns Project[] : the list of projects
   */
  getAll() : Observable<Project[]>{
    return this.http.get<Project[]>(baseUrl);
  }

  /**
   * Gets a project specified by its id
   * @param id number : id of the project to get
   * @returns Project : project corresponding to the id
   */
  get(id: number) : Observable<Project>{
    return this.http.get<Project>(`${baseUrl}/${id}`);
  }

  /**
   * Creates a new project based on the input data
   * @param data Project : data of the new project
   * @returns Project : project posted
   */
  create(data : Project) : Observable<Project>{
    return this.http.post<Project>(baseUrl, data);
  }

  /**
   * Updates an existing project
   * @param id number : id of the project to update
   * @param data Project : new project data
   * @returns Project : updated project data 
   */
  update(id : number, data: Project) : Observable<Project>{
    return this.http.put<Project>(`${baseUrl}/${id}`, data);
  }

  /**
   * Deletes a project by its id 
   * @param id number : id of the project to delete
   * @returns /
   */
  delete(id : number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  /**
   * Find project by title
   * @param title string : title of the project to find
   * @returns Project : corresponding sprint
   */
  findByTitle(title : string): Observable<Project> {
    return this.http.get<Project>(`${baseUrl}?title=${title}`);
  }
}