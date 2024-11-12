import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket} from '../models/ticket';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  /**
   * Gets all tickets
   * @returns Ticket[] : the list of tickets
   */
  getAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(baseUrl);
  }

  /**
   * Gets a ticket specified by its id
   * @param id number : id of the ticket to get
   * @returns Ticket : ticket corresponding to the id
   */
  get(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${baseUrl}/${id}`);
  }

  /**
   * Creates a new ticket based on the input data
   * @param data Ticket : data of the new ticket
   * @returns Ticket : ticket posted
   */
  create(data : Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(baseUrl, data);
  }

  /**
   * Updates an existing ticket
   * @param id number : id of the ticket to update
   * @param data Ticket : new ticket data
   * @returns Ticket : updated ticket data 
   */
  update(id : number, data: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${baseUrl}/${id}`, data);
  }

  /**
   * Deletes a ticket by its id 
   * @param id number : id of the ticket to delete
   * @returns /
   */
  delete(id : number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  /**
   * Find ticket by title
   * @param title string : title of the ticket to find
   * @returns Ticket : corresponding ticket
   */
  findByTitle(title : string): Observable<Ticket> {
    return this.http.get<Ticket>(`${baseUrl}?title=${title}`);
  }

}