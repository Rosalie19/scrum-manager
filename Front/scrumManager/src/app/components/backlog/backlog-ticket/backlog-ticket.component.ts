import { Component, Input } from '@angular/core';
import { TicketScrum } from '../../../models/ticket-scrum';
import { NgClass } from '@angular/common';
import {CdkDragHandle} from '@angular/cdk/drag-drop';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-backlog-ticket',
  standalone: true,
  imports: [NgClass, CdkDragHandle, NgIconComponent],
  viewProviders: [provideIcons({ heroBars3 })],
  templateUrl: './backlog-ticket.component.html',
  styleUrl: './backlog-ticket.component.scss'
})
export class BacklogTicketComponent {
  @Input() ticket!: TicketScrum
}
