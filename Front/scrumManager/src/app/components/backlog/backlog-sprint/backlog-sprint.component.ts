import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BacklogTicketComponent } from '../backlog-ticket/backlog-ticket.component';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Ticket } from '../../../models/ticket';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencil, heroCheck, heroXMark, heroTrash } from '@ng-icons/heroicons/outline';
import { FormsModule } from '@angular/forms';
import { SprintService } from '../../../services/sprint.service';
import { TicketService } from '../../../services/ticket.service';
import { Sprint } from '../../../models/sprint';
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
  @Output() dropTicket : EventEmitter<CdkDragDrop<string[]>> = new EventEmitter<CdkDragDrop<string[]>>();
  @Output() clickedTicket : EventEmitter<Ticket> = new EventEmitter<Ticket>();
  @Output() deleteSprint : EventEmitter<number> = new EventEmitter<number>();
  modify: boolean = false;
  constructor(private mySprintService: SprintService, private myTicketService : TicketService) { }

  /**
   * Send drop event to parent
   * @param event drag and drop event
   * @test tested
   */
  onDrop(event: CdkDragDrop<string[]>) : void{
    this.dropTicket.emit(event);
  }

  /**
   * Filter tickets by title
   * @param searchText 
   * @returns filtered tickets
   * @test tested
   */
  filterTickets(searchText: string) : Ticket[] {
    if (!searchText || searchText.length < 3) {
      return this.sprint.tickets;
    }

    return this.sprint.tickets.filter((item: { title: string; }) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  /**
   * Emits to parent when a ticket is clicked on
   * @param clickEvent the clicked ticket
   * @test tested
   */
  onTicketClicked(clickEvent?: Ticket) : void {
    this.clickedTicket.emit(clickEvent);
  }

  /**
   * Add a new ticket to the sprint 
   * @test tested
   */
  addTicket() : void{
    this.myTicketService.create(new Ticket(0, "Nouveau Ticket", 0, 0)).subscribe(response => {
      var newTicket = response as Ticket;
      this.sprint.tickets.push(newTicket);
      this.updateSprint();
      this.onTicketClicked(newTicket);
    })
  }

  /**
   * Toggle modify flag
   * @test tested
   */
  toggleModify() : void{
    this.modify = !this.modify
  }

  /**
   * Updates the sprint and toggles modify flag on input
   * @test tested
   */
  modifyTitle() : void{
    this.updateSprint()
    this.toggleModify()
  }

  /**
   * Updates the sprint on the server
   * @test tested
   */
  updateSprint() : void{
    this.mySprintService.update(this.sprint.id, this.sprint).subscribe(response => {
      console.log("sprint title updated : ", response, this.sprint )
    })
  }

  /**
   * Emits delete to parent
   * @test tested
   */
  onDeleteSprint() : void{
    this.deleteSprint.emit(this.sprint.id)
  }
}
