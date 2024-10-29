import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketScrum } from '../../../models/ticket-scrum';
import { TicketService } from '../../../services/ticket.service';
import { SprintService } from '../../../services/sprint.service';
@Component({
  selector: 'app-backlog-detail-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './backlog-detail-ticket.component.html',
  styleUrl: './backlog-detail-ticket.component.scss'
})
export class BacklogDetailTicketComponent {
  titleInput: string = "";
  descriptionInput: string = "";
  pointsInput: number = 0;
  id: number = -1;

  constructor(private myTicketService: TicketService, private mySprintService: SprintService) { }

  onSubmit() :void {
    const newTicket : TicketScrum = new TicketScrum(0, this.titleInput, this.pointsInput, 0, 1);
    
    if (this.id === -1){
      this.myTicketService.create(newTicket).subscribe(response => {
        console.log("created : ", response)
        const postTicket = response as TicketScrum
        this.mySprintService.addTicketToSprint(0,postTicket ).subscribe(response => {
          console.log("sprint : ", response)
        })
      })
    } else {
      this.myTicketService.update(this.id, newTicket).subscribe(response => {
        console.log("updated : ", response)
      })
    }

  }
}
