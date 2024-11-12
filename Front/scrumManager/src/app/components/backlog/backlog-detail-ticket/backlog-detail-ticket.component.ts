/**
 * Component Backlog Detail Ticket
 * @parent page-backlog
 * @functionnalities Form to modify a ticket. 
 * Is visible when the user clicks on an existing ticket or on a "add ticket" button
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TICKET_STATUSES } from '../../../app.constants';
@Component({
  selector: 'app-backlog-detail-ticket',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgIconComponent,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule],
  viewProviders: [provideIcons({ heroXMark })],
  templateUrl: './backlog-detail-ticket.component.html',
  styleUrl: './backlog-detail-ticket.component.scss'
})
export class BacklogDetailTicketComponent implements OnInit {

  /**
   * inputTicket : data of the ticket to modify
   * toggleDetails : flag sent to parent to close the component
   * currentTicket : Ticket object containing the ticket modified by the user
   * states : states of a ticket (constant)
   */
  @Input() inputTicket: Ticket = new Ticket(0, "", 0, 0);
  @Output() toggleDetails = new EventEmitter<boolean>();
  currentTicket: Ticket = new Ticket(0, "", 0, 0);
  states = TICKET_STATUSES

  constructor(private myTicketService: TicketService) { }

  /**
   * Called on init
   * @test not tested
   */
  ngOnInit() {
    this.currentTicket.title = this.inputTicket.title
    this.currentTicket.points = this.inputTicket.points
    this.currentTicket.id = this.inputTicket.id
    this.currentTicket.status = this.inputTicket.status
  }

  /**
   * Creates the ticket if it doesn't exist
   * updates the existing ticket otherwise
   * @test tested
   */
  onSubmit(): void {
    this.myTicketService.update(this.currentTicket.id, this.currentTicket).subscribe(response => {
      console.log("updated : ", response)
      this.onToggle(false);
    })
  }

  /**
   * Deletes a ticket
   * @test tested
   */
  onDelete(): void {
    if (this.currentTicket.id !== 0) {
      this.myTicketService.delete(this.currentTicket.id).subscribe(response => {
        console.log("Ticket deleted : ", response);
        this.onToggle(false);
      })
    }
  }

  /**
   * Open/close detail window
   * @param flag true if the detail window is opened
   * @test tested
   */
  onToggle(flag: boolean): void {
    this.toggleDetails.emit(flag);
  }
}
