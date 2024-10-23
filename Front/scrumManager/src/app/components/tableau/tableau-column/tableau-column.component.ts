import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TableauTicketComponent } from '../tableau-ticket/tableau-ticket.component';
import { NgFor } from '@angular/common';
import { CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import { TicketScrum } from '../../../models/ticket-scrum';

@Component({
  selector: 'app-tableau-column',
  standalone: true,
  imports: [TableauTicketComponent, NgFor, DragDropModule],
  templateUrl: './tableau-column.component.html',
  styleUrl: './tableau-column.component.scss'
})
export class TableauColumnComponent {
  @Input() title: any;
  @Input() tickets!: TicketScrum[];
  @Input() columnIndex!: number;
  @Input() connectedDropLists!: string[];
  @Output() dropTicket = new EventEmitter<CdkDragDrop<TicketScrum[]>>();

  onDrop(event: CdkDragDrop<TicketScrum[]>) {
    this.dropTicket.emit(event);
  }
}
