import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketScrum } from '../../../models/ticket-scrum';
import { TicketService } from '../../../services/ticket.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { Sprint } from '../../../models/sprint';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-backlog-detail-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIconComponent, MatInputModule, MatSelectModule, MatFormFieldModule],
  
  viewProviders: [provideIcons({ heroXMark })],
  templateUrl: './backlog-detail-ticket.component.html',
  styleUrl: './backlog-detail-ticket.component.scss'
})
export class BacklogDetailTicketComponent implements OnInit{

  @Input() inputTicket: [Sprint?, TicketScrum?] =[];
  @Output() toggleDetails = new EventEmitter<boolean>();
  currentTicket : TicketScrum = new TicketScrum(0,"",0,0)
  /*
  titleInput: string = "";
  descriptionInput: string = "";
  pointsInput: number = 0;
  id: number = 0;
  */
  states: string[] = ["À faire", "En cours", "À tester", "Terminé"]
  constructor(private myTicketService: TicketService) { }

  /**
   * Called on init
   */
  ngOnInit(){
    
    if (this.inputTicket[1]){
      this.currentTicket.title = this.inputTicket[1].title
      this.currentTicket.points  = this.inputTicket[1].points
      this.currentTicket.id  = this.inputTicket[1].id
      this.currentTicket.status  = this.inputTicket[1].status
    }

    if(this.inputTicket[0]){
      this.currentTicket.sprint = this.inputTicket[0]
    }
  }
  /**
   * Creates the ticket if it doesn't exist
   * updates the existing ticket otherwise
   * @test not tested
   */
  onSubmit() :void {
    //const newTicket : TicketScrum = new TicketScrum(0, this.titleInput, this.pointsInput, 0, this.inputTicket[0]);
    console.log("submit :" , this.currentTicket)
    if (this.inputTicket[1]){
      this.myTicketService.update(this.currentTicket.id, this.currentTicket).subscribe(response => {
        console.log("updated : ", response)
        this.onToggle(false);
      })
      
    } else {
      this.myTicketService.create(this.currentTicket).subscribe(response => {
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
    if (this.currentTicket.id !== 0){
      this.myTicketService.delete(this.currentTicket.id).subscribe(response => {
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
