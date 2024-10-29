import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { BacklogSprintComponent } from '../backlog-sprint/backlog-sprint.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Sprint } from '../../../models/sprint';
import { TicketScrum } from '../../../models/ticket-scrum';
import { SprintService } from '../../../services/sprint.service';
import { FormsModule } from '@angular/forms';
import { BacklogDetailTicketComponent } from '../backlog-detail-ticket/backlog-detail-ticket.component';
@Component({
  selector: 'app-page-backlog',
  standalone: true,
  imports: [HeaderComponent, BacklogSprintComponent, BacklogDetailTicketComponent, NgFor, FormsModule],
  templateUrl: './page-backlog.component.html',
  styleUrl: './page-backlog.component.scss'
})
export class PageBacklogComponent implements OnInit {
  sprints!: Sprint[];
  searchText: string = '';
  constructor(private mySprintService: SprintService) { }

  /**
   * Called on init 
   */
  ngOnInit(): void {
    this.mySprintService.getAll().subscribe(response => {
      this.loadData(response);
    })
  }

  /**
   * Drag and drop events manager
   * @param event 
   * @param sprintIndex 
   */
  drop(event: CdkDragDrop<string[]>, sprintIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.sprints[sprintIndex].tickets, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
    }
    this.updateSprints()
  }

  /**
   * Load data from db
   * @param data 
   */
  loadData(data: any) {
    this.sprints = [];
    for (var sprint of data) {
      var ticketsList: TicketScrum[] = [];
      for (var ticket of sprint.tickets) {
        ticketsList.push(new TicketScrum(ticket.id, ticket.title, ticket.points, ticket.status))
      }
      this.sprints.push(new Sprint(sprint.id, sprint.title, ticketsList))
    }
  }

  /**
   * Send updated sprints to back 
   */
  updateSprints() {
    for (var sprint of this.sprints) {
      this.mySprintService.update(sprint.id, sprint).subscribe(response =>{
        console.log(response)
      })
    }
  }

  /**
   * Get the names of teh other sprints in order to connect the drag and drop lists
   * @returns the list of sprints names
   */
  getConnectedDropLists(): string[] {
    return this.sprints.map((_, index) => `sprint-${index}`);
  }

}
