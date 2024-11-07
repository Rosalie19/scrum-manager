import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { BacklogSprintComponent } from '../backlog-sprint/backlog-sprint.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor, NgIf } from '@angular/common';
import { Sprint } from '../../../models/sprint';
import { TicketScrum } from '../../../models/ticket-scrum';
import { SprintService } from '../../../services/sprint.service';
import { FormsModule } from '@angular/forms';
import { BacklogDetailTicketComponent } from '../backlog-detail-ticket/backlog-detail-ticket.component';
import { PopupComponent } from '../../popup/popup.component';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-page-backlog',
  standalone: true,
  imports: [HeaderComponent, PopupComponent, BacklogSprintComponent, BacklogDetailTicketComponent, NgFor, NgIf, FormsModule],
  templateUrl: './page-backlog.component.html',
  styleUrl: './page-backlog.component.scss'
})
export class PageBacklogComponent implements OnInit {
  sprints: Sprint[] = [];
  details: boolean = false;
  clickedTicket!: [Sprint?, TicketScrum?];
  searchText: string = '';
  popupFlag: boolean = false;
  popupQuestion: string = "";
  deleteId: number = -1;
  project: Project = new Project(-1, "", "", [])
  constructor(private mySprintService: SprintService) { }

  get sortedItems() {
    return this.sprints.sort((a, b) => {
      if (b.started) return 1;
      if (a.started) return -1;
      return 0;
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.mySprintService.getAll().subscribe(response => {
      this.sprints = response as Sprint[];
      this.sprints = this.sprints.sort((a, b) => {
        return a.id - b.id
      });
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
   * Finds and returns the backlog in a list of sprints
   * @param sprintsList the list of srpints containing the backlog
   * @returns the backlog
   */
  getBacklog(sprintsList: Sprint[]): Sprint {
    var backlog: Sprint | undefined = sprintsList.find(item => item.backlog);
    if (backlog) {

      return backlog
    } else {
      return new Sprint(-1, "", [], false, true)
    }
  }

  // A ENLEVER ?
  /**
   * Removes the backlog from a list of sprints and stores it in anther variable
   * @param sprintsList the list of sprints containing backlog
   * @returns [sprints, backlog] the list without backlog and the backlog 
   */
  removeBacklogFromSprints(sprintsList: Sprint[]): [Sprint[], Sprint | undefined] {
    var sprintsWithoutBacklog: Sprint[] = sprintsList.filter(item => item.title !== 'Backlog');
    var backlog: Sprint | undefined = sprintsList.find(item => item.title === 'Backlog');
    return [sprintsWithoutBacklog, backlog]
  }

  /**
   * Send updated sprints to back 
   */
  updateSprints(): void {
    for (var sprint of this.sprints) {
      this.mySprintService.update(sprint.id, sprint).subscribe(response => {
        console.log("Page Backlog - update sprint : ", response)
      })
    }
  }

  /**
   * Get the names of the other sprints in order to connect the drag and drop lists
   * @returns the list of sprints names
   */
  getConnectedDropLists(): string[] {
    if (this.sprints) {
      return [`sprint-0`, ... this.sprints.map((_, index) => `sprint-${index + 1}`)];
    } else {
      return []
    }

  }

  /**
   * Add a new sprint 
   */
  addSprint(): void {
    this.mySprintService.create(new Sprint(100, "Nouveau sprint", [], false, false)).subscribe(response => {
      console.log("Page Backlog - create sprint : ", response);
      this.loadData();
    });
  }

  /**
   * Open the question popup
   * @param id Id of the sprint to delete
   */
  onClickDelete(id: number): void {
    this.popupQuestion = "Voulez-vous vraiment supprimer ce sprint? (Les tickets seront déplacés vers le backlog)"
    this.popupFlag = true
    this.deleteId = id;
  }


  /**
   * Delete a sprint and add its tickets to backlog 
   * @param sprint_id id of the sprint to delete 
   */
  deleteSprint(sprintToDelete: Sprint): void {
    var backlog = this.getBacklog(this.sprints);

      backlog.tickets = backlog.tickets.concat(sprintToDelete.tickets)
      // Update backlog tickets
      this.mySprintService.update(backlog.id, backlog).subscribe(_ => {
        //Delete sprint
        this.mySprintService.delete(sprintToDelete.id).subscribe(_ => {
          //Refresh the displayed data
          this.loadData();
        })
      })
    

    /*
    var backlog = this.getBacklog(this.sprints)
    backlog.tickets = backlog.tickets.concat(sprintToDelete.tickets)
    sprintToDelete.tickets = []
    this.mySprintService.update(sprintToDelete.id, sprintToDelete).subscribe(response => {
      console.log("after updating sprint to delete : ", response)
      // Update backlog tickets
      this.mySprintService.update(backlog.id, backlog).subscribe(_ => {
        console.log("after updating backlog : ", response)
        console.log("after updating backlog : ", backlog)
        //Delete sprint
        this.mySprintService.delete(sprintToDelete.id).subscribe(_ => {

          //Refresh the displayed data
          this.loadData();
        })
      })
    })
      */
  }


  /**
   * Upadates the sprint id of a list of tickets
   * @param id the new id
   * @param tickets the tickets to update
   * @returns the updates tickets list
   */
  updateSprint(sprint: Sprint, tickets: TicketScrum[]): TicketScrum[] {
    for (let item of tickets) {
      item.sprint = sprint
    }
    console.log("update id : ", tickets)
    return tickets
  }

  /**
   * Deletes a sprint depending on the user answer
   * @param flag if true, delete the sprint 
   */
  onPopupClicked(flag: boolean): void {
    this.popupFlag = false
    if (flag) {
      var sprintToDelete: Sprint | undefined = this.sprints.find(item => item.id === this.deleteId);
      if (sprintToDelete) {
        this.deleteSprint(sprintToDelete);
      } else {
        console.log("Error deleteSprint : sprint not found")
      }
    }
  }

  /**
   * Open the ticket details window when the user clicks on a ticket 
   * @param data the sprint and the ticket corresponding to the item clicked
   */
  openDetails(data: [Sprint?, TicketScrum?]): void {
    this.clickedTicket = data;
    this.toggleDetails(true)
  }

  /**
   * Open or close the ticket detials window
   * @param flag true to open, false to close
   */
  toggleDetails(flag: boolean): void {
    this.details = flag;
    this.loadData();
  }


}
