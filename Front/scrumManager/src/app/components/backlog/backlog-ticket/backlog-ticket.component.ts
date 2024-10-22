import { Component, Input } from '@angular/core';
import { TicketScrum } from '../../../models/ticket-scrum';

@Component({
  selector: 'app-backlog-ticket',
  standalone: true,
  imports: [],
  templateUrl: './backlog-ticket.component.html',
  styleUrl: './backlog-ticket.component.scss'
})
export class BacklogTicketComponent {
  @Input() ticket!: TicketScrum
}
