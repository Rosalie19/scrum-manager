import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BacklogTicketComponent } from '../backlog-ticket/backlog-ticket.component';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { TicketScrum } from '../../../models/ticket-scrum';
import { Sprint } from '../../../models/sprint';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencil, heroCheck, heroXMark, heroTrash } from '@ng-icons/heroicons/outline';
import { FormsModule } from '@angular/forms';
import { SprintService } from '../../../services/sprint.service';
@Component({
  selector: 'app-backlog-sprint',
  standalone: true,
  imports: [BacklogTicketComponent, NgFor, DragDropModule, NgClass, NgIf, NgIconComponent, FormsModule],

  viewProviders: [provideIcons({ heroPencil, heroCheck, heroXMark, heroTrash })],
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
  @Output() deleteSprint = new EventEmitter<number>();
  modify: boolean = false;
  constructor(private mySprintService: SprintService) { }

  
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

  onTicketClicked(clickEvent?: TicketScrum) {
    this.clickedTicket.emit([this.sprint, clickEvent]);
  }

  toggleModify() {
    this.modify = !this.modify
  }

  modifyTitle() {
    this.mySprintService.update(this.sprint.id, this.sprint).subscribe(response => {
      console.log("sprint title updated : ", response )
    })
    this.toggleModify()
  }

  onDeleteSprint(){
    this.deleteSprint.emit(this.sprint.id)
  }
}
