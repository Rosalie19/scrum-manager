import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BacklogTicketComponent } from '../backlog-ticket/backlog-ticket.component';
import { NgFor } from '@angular/common';
import { CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-backlog-sprint',
  standalone: true,
  imports: [BacklogTicketComponent, NgFor, DragDropModule],
  templateUrl: './backlog-sprint.component.html',
  styleUrl: './backlog-sprint.component.scss'
})
export class BacklogSprintComponent {
  @Input() sprint: any;
  @Input() sprintIndex!: number;
  @Input() connectedDropLists!: string[];
  @Output() dropTicket = new EventEmitter<CdkDragDrop<string[]>>();

  onDrop(event: CdkDragDrop<string[]>) {
    this.dropTicket.emit(event);
  }
}
