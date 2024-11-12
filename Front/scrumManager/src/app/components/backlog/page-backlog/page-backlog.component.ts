import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { BacklogSprintComponent } from '../backlog-sprint/backlog-sprint.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor, NgIf } from '@angular/common';
import { Sprint } from '../../../models/sprint';
import { Ticket } from '../../../models/ticket';
import { SprintService } from '../../../services/sprint.service';
import { FormsModule } from '@angular/forms';
import { BacklogDetailTicketComponent } from '../backlog-detail-ticket/backlog-detail-ticket.component';
import { PopupComponent } from '../../popup/popup.component';
import { Project } from '../../../models/project';
import { TicketService } from '../../../services/ticket.service';

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
  clickedTicket!: Ticket;
  searchText: string = '';
  popupFlag: boolean = false;
  popupQuestion: string = "";
  deleteId: number = -1;
  project: Project = new Project(-1, "", "", [])
  constructor(private mySprintService: SprintService, private myTicketService: TicketService) { }

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

  /**
   * Load sprints data from server
   * @test tested
   */
  loadData(): void {
    this.mySprintService.getAll().subscribe(response => {
      this.sprints = this.sortSprintsById(response as Sprint[]);
    })
  }

  /**
   * Order sprints by descending ids
   * @param sprints sprints to order
   * @returns ordered sprints
   * @test tested
   */
  sortSprintsById(sprints: Sprint[]): Sprint[] {
    return sprints.sort((a, b) => {
      return a.id - b.id
    });
  }

  /**
   * Drag and drop events manager
   * @param event 
   * @param sprintIndex 
   * @test not tested
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
   * @test tested
   */
  getBacklog(sprintsList: Sprint[]): Sprint {
    var backlog: Sprint | undefined = sprintsList.find(item => item.backlog);
    if (backlog) {
      return backlog
    } else {
      return new Sprint(-1, "", [], false, true)
    }
  }

  /**
   * Send updated sprints to back 
   * @test tested
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
   * @test tested
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
   * @test tested
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
   * @test tested
   */
  onClickDelete(id: number): void {
    this.popupQuestion = "Voulez-vous vraiment supprimer ce sprint? (Les tickets seront déplacés vers le backlog)"
    this.popupFlag = true
    this.deleteId = id;
  }


  /**
   * Delete a sprint and add its tickets to backlog 
   * @param sprint_id id of the sprint to delete 
   * @test tested
   */
  async deleteSprint(sprintToDelete: Sprint): Promise<void> {
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
  }

  /**
   * Deletes a sprint depending on the user answer
   * @param flag if true, delete the sprint 
   * @test tested
   */
  onPopupClicked(flag: boolean): void {
    this.popupFlag = false
    if (flag) {
      var sprintToDelete: Sprint | undefined = this.sprints.find(item => item.id === this.deleteId);
      if (sprintToDelete) {
        this.deleteSprint(sprintToDelete);
      } else {
        console.error("Error deleteSprint : sprint not found")
        throw new Error("Sprint not found")
      }
    }
  }

  /**
   * Open the ticket details window when the user clicks on a ticket 
   * @param data the sprint and the ticket corresponding to the item clicked
   * @test tested
   */
  openDetails(ticket: Ticket): void {
    this.clickedTicket = ticket;
    this.toggleDetails(true)
  }

  /**
   * Open or close the ticket detials window
   * @param flag true to open, false to close
   * @test tested
   */
  toggleDetails(flag: boolean): void {
    this.details = flag;
    this.loadData();
  }


}
