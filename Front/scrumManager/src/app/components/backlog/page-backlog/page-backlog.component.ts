import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { BacklogSprintComponent } from '../backlog-sprint/backlog-sprint.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';

import { Sprint } from '../../../models/sprint';
import { TicketScrum } from '../../../models/ticket-scrum';
import { SprintService } from '../../../services/sprint.service';

@Component({
  selector: 'app-page-backlog',
  standalone: true,
  imports: [HeaderComponent, BacklogSprintComponent, NgFor],
  templateUrl: './page-backlog.component.html',
  styleUrl: './page-backlog.component.scss'
})
export class PageBacklogComponent implements OnInit{
  sprints!: Sprint[];

  constructor(private mySprintService: SprintService) { }

  ngOnInit(): void {

    this.mySprintService.getAll().subscribe(response => {
      this.loadData(response);
    })


  }
  // Function to handle drop event
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
  }

  loadData(data: any){
    this.sprints = [];
    for (var sprint of data){
      var ticketsList : TicketScrum[] = [];
      for (var ticket of sprint.tickets){
        ticketsList.push(new TicketScrum(ticket.id, ticket.title, ticket.points, ticket.status))
      }
      this.sprints.push(new Sprint(sprint.id, sprint.title, ticketsList))
    }
  }

  getConnectedDropLists(): string[] {
    return this.sprints.map((_, index) => `sprint-${index}`);
  }

}
