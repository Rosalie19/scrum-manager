import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketScrum } from '../../../models/ticket-scrum';
import { TableauTicketComponent } from '../tableau-ticket/tableau-ticket.component';
import { NgForOf } from '@angular/common';
import { TableauPointsComponent } from '../tableau-points/tableau-points.component';
import { TicketService

 } from '../../../services/ticket.service';
@Component({
  selector: 'app-page-tableau',
  standalone: true,
  imports: [HeaderComponent, DragDropModule, TableauTicketComponent, TableauPointsComponent, NgForOf],
  templateUrl: './page-tableau.component.html',
  styleUrl: './page-tableau.component.scss'
})
export class PageTableauComponent implements OnInit {
  /**
   * columnList TicketScrum[][] : array of the lists of tickets in each column 
   * sumList number[] : array of the sum of the tickets points in each column 
   */

  constructor(private myTicketService: TicketService) { }
  columnList: TicketScrum[][] = [[],[], [], []];
  sumList: number[] = [0,0,0,0];
  ngOnInit() {
    this.loadData();
    
    //Initialize sums 
    console.log(this.sumList);
  }

  /**
   * Drag and drop event manager 
   * @param event the drag and drop event 
   */
  drop(event: CdkDragDrop<TicketScrum[]>) {
    const droppedTicket = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateAllSums();
      const containerIndex = this.columnList.findIndex(list => list === event.container.data);
      droppedTicket.status = containerIndex
      this.myTicketService.update(droppedTicket.id, droppedTicket).subscribe(response => {
        console.log(response)
      })
      
    }
  }

  /**
   * Load tickets from db and update the columns
   */
  loadData() {
    this.myTicketService.getAll().subscribe( response  => {
      this.updateColumns(response)
      this.updateAllSums();
    }, error => {
      console.error('Error fetching data', error);
    });
  }

  /**
   * Returns the points total of the tickets in a list
   * @param ticketList the list of tickets
   * @returns the total 
   * @test tested
   */
  updateSum(ticketList: TicketScrum[]) {
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
      this.sumList[i] = this.updateSum(this.columnList[i])
    }
  }

  updateColumns(ticketsList : any){
    this.columnList = [[], [], [], []]
    for (var ticket of ticketsList){
      this.columnList[ticket.status].push(new TicketScrum(ticket.id, ticket.title, ticket.points, ticket.status))
    }
  }

  /**
   * Calculates the sum of all the points 
   * @param sumList list of points
   * @returns total
   * @test tested
   */
  updateTotal(sumList : number[]){
    // Initialize total 
    var total = 0;
    // Loop through the sums
    for (var i = 0; i < sumList.length; i++) {
      total += sumList[i]
    }
    return total
  }

}