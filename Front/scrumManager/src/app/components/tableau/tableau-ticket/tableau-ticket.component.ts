import { Component, Input } from '@angular/core';
import { TicketScrum } from '../../../models/ticket-scrum';
@Component({
  selector: 'app-tableau-ticket',
  standalone: true,
  imports: [],
  templateUrl: './tableau-ticket.component.html',
  styleUrl: './tableau-ticket.component.scss'
})
export class TableauTicketComponent {
  @Input() ticket!: TicketScrum;
}
