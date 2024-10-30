import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketScrum } from '../../../models/ticket-scrum';
import { TicketService } from '../../../services/ticket.service';
import { SprintService } from '../../../services/sprint.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { Sprint } from '../../../models/sprint';
@Component({
  selector: 'app-backlog-detail-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIconComponent],
  
  viewProviders: [provideIcons({ heroXMark })],
  templateUrl: './backlog-detail-ticket.component.html',
  styleUrl: './backlog-detail-ticket.component.scss'
})
export class BacklogDetailTicketComponent implements OnInit{
  @Input() inputTicket: [Sprint?, TicketScrum?] =[];
  @Output() toggleDetails = new EventEmitter<boolean>();
  titleInput: string = "";
  descriptionInput: string = "";
  pointsInput: number = 0;
  id: number = 0;
  constructor(private myTicketService: TicketService) { }

  ngOnInit(){
    
    if (this.inputTicket[1]){
      this.titleInput = this.inputTicket[1].title
      this.pointsInput = this.inputTicket[1].points
      this.id = this.inputTicket[1].id
    }
  }
  /**
   * Creates the ticket if it doesn't exist
   * updates the existing ticket otherwise
   */
  onSubmit() :void {

    const newTicket : TicketScrum = new TicketScrum(0, this.titleInput, this.pointsInput, 0, this.inputTicket[0]);
    
    if (this.inputTicket[1]){
      this.myTicketService.update(this.id, newTicket).subscribe(response => {
        console.log("updated : ", response)
        this.onToggle(false);
      })
      
    } else {
      this.myTicketService.create(newTicket).subscribe(response => {
        console.log("created : ", response);
        this.onToggle(false);
        /*
        const postTicket = response as TicketScrum
        this.mySprintService.addTicketToSprint(this.inputTicket[0],postTicket ).subscribe(response => {
          console.log("sprint : ", response)
          this.onToggle(false);
        })
          */
      })
    }
  }

  /**
   * Deletes a ticket
   */
  onDelete() : void{
    if (this.id !== -1){
      this.myTicketService.delete(this.id).subscribe(response => {
        console.log("Ticket deleted : ", response);
        this.onToggle(false);
      })
    }
    
  }

  /**
   * Open/close detail window
   * @param flag true if the detail window is opened
   */
  onToggle(flag: boolean): void{
    this.toggleDetails.emit(flag);
  }
}
