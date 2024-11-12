/**
 * Component Page Tableaux
 * @description One of the main pages of the app. 
 * Displays the tickets of the the current sprint
 * Allows the user to darg and drop them into todo/in progress/to be tested/finished columns
 * @author Rosalie Biedermann
 * @
 */

import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Ticket } from '../../../models/ticket';
import { TableauTicketComponent } from '../tableau-ticket/tableau-ticket.component';
import { TableauColumnComponent } from '../tableau-column/tableau-column.component';
import { NgForOf } from '@angular/common';
import { TableauPointsComponent } from '../tableau-points/tableau-points.component';
import {
  TicketService
} from '../../../services/ticket.service';
import { SprintService } from '../../../services/sprint.service';
import { Sprint } from '../../../models/sprint';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TICKET_STATUSES } from '../../../app.constants';
@Component({
  selector: 'app-page-tableau',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, HeaderComponent, DragDropModule, TableauTicketComponent, TableauColumnComponent, TableauPointsComponent, NgForOf],
  templateUrl: './page-tableau.component.html',
  styleUrl: './page-tableau.component.scss'
})
export class PageTableauComponent implements OnInit {
  /**
   * sprint_id number : id of the current sprint
   * currentSprint Sprint : current sprint data
   * columnList Ticket[][] : array of the lists of tickets in each column 
   * sumList number[] : array of the sum of the tickets points in each column 
   */
  @Input() sprint_id: number = 1;
  currentSprint: Sprint = new Sprint(0, "", [], false, false);
  columnList: [string, Ticket[]][] = [];
  sumList: number[] = [0, 0, 0, 0];

  constructor(private mySprintService: SprintService, private myTicketService: TicketService,) { }


  ngOnInit() {
    //Set the names of the columns
    for (let i = 0; i < TICKET_STATUSES.length; i++){
      this.columnList.push([TICKET_STATUSES[i], []])
    }

    this.emptyColumns();
    this.loadData(this.sprint_id);
  }

  /**
   * Drag and drop event manager 
   * @param event the drag and drop event 
   * @param columnIndex index of the column in which the ticket has been dropped
   * @test not tested
   */
  drop(event: CdkDragDrop<Ticket[]>, columnIndex: number) {
    //get drooped ticket data
    const droppedTicket = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      //If dropped in same container
      moveItemInArray(this.columnList[columnIndex][1], event.previousIndex, event.currentIndex);
    } else {
      //If dropped in different container
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      //Update points sum
      this.updateAllSums();

      //Update ticket status
      const containerIndex = this.columnList.findIndex(list => list[1] === event.container.data);
      droppedTicket.status = containerIndex;
      this.myTicketService.update(droppedTicket.id, droppedTicket).subscribe(response => {
        console.log("page tableaux - upadte ticket on drop: ", response)
      })
    }
  }

  /**
   * Load sprint data from db 
   * @param id id of the sprint to load
   * @test not tested
   */
  loadData(id: number) {
    this.mySprintService.get(id).subscribe({
      next: (response) => {
        this.updateAll(response);
        console.log("Page tableaux - load data: ", this.currentSprint);
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }

  /**
   * Updates local variables currentSprint, columnList and sumList with the specified sprint data
   * @param sprint new sprint data 
   * @test not tested
   */
  updateAll(sprint : Sprint){
    this.currentSprint = sprint;
    this.updateColumns(this.currentSprint.tickets);
    this.updateAllSums();
  }

  /**
   * Returns the points total of the tickets in a list
   * @param ticketList the list of tickets
   * @returns the total 
   * @test tested
   */
  updateSum(ticketList: Ticket[]): number {
    //Initialize points 
    var total = 0;
    for (var ticket of ticketList) {
      total += ticket.points;
    }
    return total
  }

  /**
   * Updates all the sums
   * @test tested
   */
  updateAllSums() {
    for (var i = 0; i < this.columnList.length; i++) {
      this.sumList[i] = this.updateSum(this.columnList[i][1])
    }
  }

  /**
   * Insert tickets in columns from http response data 
   * @param ticketsList the object returned by the http request
   * @test not tested
   */
  updateColumns(ticketsList: Ticket[]) {
    this.emptyColumns();
    console.log(this.columnList)
    for (var ticket of ticketsList) {
      this.columnList[ticket.status][1].push(ticket as Ticket)
    }
  }

  /**
   * Calculates the sum of all the points 
   * @param sumList list of points
   * @returns total
   * @test not tested
   */
  updateTotal(sumList: number[]): number {
    // Initialize total 
    var total = 0;
    // Loop through the sums
    for (var i = 0; i < sumList.length; i++) {
      total += sumList[i]
    }
    return total
  }

  /**
   * Empty columnList attribute
   * @test tested
   */
  emptyColumns() {
    this.columnList = []
    for (let i = 0; i < TICKET_STATUSES.length; i++){
      this.columnList.push([TICKET_STATUSES[i],[]])
    }
  }

  /**
   * Get the ids of the other columns to enable drag and drop between them
   * @returns a list of column names
   * @test not tested
   */
  getConnectedDropLists(): string[] {
    return this.columnList.map((_, index) => `column-${index}`);
  }

}