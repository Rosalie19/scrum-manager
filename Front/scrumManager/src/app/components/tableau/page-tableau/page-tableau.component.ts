import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketScrum } from '../../../models/ticket-scrum';
import { TableauTicketComponent } from '../tableau-ticket/tableau-ticket.component';
import { TableauColumnComponent } from '../tableau-column/tableau-column.component';
import { NgForOf } from '@angular/common';
import { TableauPointsComponent } from '../tableau-points/tableau-points.component';
import { TicketService

 } from '../../../services/ticket.service';
import { SprintService } from '../../../services/sprint.service';
import { Sprint } from '../../../models/sprint';
@Component({
  selector: 'app-page-tableau',
  standalone: true,
  imports: [HeaderComponent, DragDropModule, TableauTicketComponent,TableauColumnComponent, TableauPointsComponent, NgForOf],
  templateUrl: './page-tableau.component.html',
  styleUrl: './page-tableau.component.scss'
})
export class PageTableauComponent implements OnInit {
  /**
   * columnList TicketScrum[][] : array of the lists of tickets in each column 
   * sumList number[] : array of the sum of the tickets points in each column 
   */
  @Input() sprint_id: number  = 1;
  constructor(private mySprintService: SprintService, private myTicketService: TicketService,) { }
  columnList!: [string, TicketScrum[]][];
  sprint : Sprint = new Sprint(0,"",[]);
  sumList: number[] = [0,0,0,0];
  ngOnInit() {
    this.emptyColumns();
    this.loadData();
  }

  /**
   * Drag and drop event manager 
   * @param event the drag and drop event 
   */
  drop(event: CdkDragDrop<TicketScrum[]>, columnIndex: number) {
    const droppedTicket = event.previousContainer.data[event.previousIndex];
    console.log(event.previousContainer.data)
    if (event.previousContainer === event.container) {
      moveItemInArray(this.columnList[columnIndex][1], event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateAllSums();
      const containerIndex = this.columnList.findIndex(list => list[1] === event.container.data);
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
    this.mySprintService.get(this.sprint_id).subscribe( response  => {
      this.sprint = response as Sprint;
      this.updateColumns(this.sprint.tickets)
      this.updateAllSums();
      console.log("tableau load data: ", this.sprint)
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
  updateSum(ticketList: TicketScrum[]) : number{
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
   * @test tested
   */
  updateColumns(ticketsList : any){
    this.emptyColumns();
    for (var ticket of ticketsList){
      this.columnList[ticket.status][1].push(new TicketScrum(ticket.id, ticket.title, ticket.points, ticket.status, this.sprint))
    }
  }

  /**
   * Calculates the sum of all the points 
   * @param sumList list of points
   * @returns total
   * @test tested
   */
  updateTotal(sumList : number[]) : number{
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
  emptyColumns(){
    this.columnList = [["À faire", []], ["En cours", []], ["À tester", []], ["Terminé", []]];
  }

  /**
   * Get the ids of the other columns to enable drag and drop between them
   * @returns a list of column names
   */
  getConnectedDropLists(): string[] {
    return this.columnList.map((_, index) => `column-${index}`);
  }

}