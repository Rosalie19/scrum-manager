import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BacklogTicketComponent } from '../backlog-ticket/backlog-ticket.component';
import { NgFor, NgClass } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { TicketScrum } from '../../../models/ticket-scrum';
import { Sprint } from '../../../models/sprint';

@Component({
  selector: 'app-backlog-sprint',
  standalone: true,
  imports: [BacklogTicketComponent, NgFor, DragDropModule, NgClass],
  templateUrl: './backlog-sprint.component.html',
  styleUrls: ['./backlog-sprint.component.scss']
})
export class BacklogSprintComponent {
  @Input() searchText!: string;
  @Input() sprint: any;
  @Input() sprintIndex!: number;
  @Input() connectedDropLists!: string[];
  @Output() dropTicket = new EventEmitter<CdkDragDrop<string[]>>();
  @Output() clickedTicket = new EventEmitter<[Sprint?, TicketScrum?]>();
  onDrop(event: CdkDragDrop<string[]>) {
    this.dropTicket.emit(event);
  }

  /**
   * Filter tickets by title
   * @param searchText 
   * @returns 
   */
  filterTickets(searchText: string) {
    if (!searchText || searchText.length < 3) {
      return this.sprint.tickets;
      ;
    }
    return this.sprint.tickets.filter((item: { title: string; }) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onTicketClicked(clickEvent? : TicketScrum){
    this.clickedTicket.emit([this.sprint, clickEvent]);
  }
}
