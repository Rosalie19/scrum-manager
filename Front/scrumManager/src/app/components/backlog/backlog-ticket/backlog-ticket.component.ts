import { Component, Input } from '@angular/core';
import { TicketScrum } from '../../../models/ticket-scrum';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-backlog-ticket',
  standalone: true,
  imports: [NgClass],
  templateUrl: './backlog-ticket.component.html',
  styleUrl: './backlog-ticket.component.scss'
})
export class BacklogTicketComponent {
  @Input() ticket!: TicketScrum
}
