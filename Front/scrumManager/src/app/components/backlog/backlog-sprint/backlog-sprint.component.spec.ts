import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BacklogSprintComponent } from './backlog-sprint.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SprintService } from '../../../services/sprint.service';
import { DebugElement } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Sprint } from '../../../models/sprint';
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket.service';

describe('BacklogSprintComponent', () => {

  let component: BacklogSprintComponent;
  let fixture: ComponentFixture<BacklogSprintComponent>;
  let sprintService: SprintService;
  let ticketService: TicketService;
  let debugElement: DebugElement;
  let createTicketSpy: any;
  let updateSprintSpy: any;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [BacklogSprintComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), TicketService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BacklogSprintComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.sprint = new Sprint(1, "Sprint test", [], false, true);
    fixture.detectChanges();

    sprintService = debugElement.injector.get(SprintService);
    ticketService = debugElement.injector.get(TicketService); 
    createTicketSpy = spyOn(ticketService, 'create').and.callThrough();
    updateSprintSpy = spyOn(sprintService, 'update').and.callThrough();

  });

  it('onDrop : emits to parent', () => {
    //Arrange
    spyOn(component.dropTicket, 'emit')

    // Act
    const mockEvent = { previousIndex: 0, currentIndex: 1 } as CdkDragDrop<string[]>;
    component.onDrop(mockEvent);
    
    //Assert
    expect(component.dropTicket.emit).toHaveBeenCalledWith(mockEvent);
  });

  it('filterTickets : with text length < 3', () => {
    //Arrange
    const mockTicketList : Ticket[] = [
      new Ticket(1, "Changer", 0, 0),
      new Ticket(2, "Faire", 0, 0),
    ];
    component.sprint.tickets = mockTicketList;

    // Act
    var resultTicketList : Ticket[] = component.filterTickets("");
    
    //Assert
    expect(resultTicketList).toEqual(mockTicketList);
  });

  it('filterTickets : with text length > 3', () => {
    //Arrange
    const mockTicketList : Ticket[] = [
      new Ticket(1, "Changer les couleurs", 2, 2),
      new Ticket(2, "Faire", 0, 0),
      new Ticket(3, "Changer les boutons", 8, 1)
    ];
    const expectedTicketList : Ticket[] = [
      new Ticket(1, "Changer les couleurs", 2, 2),
      new Ticket(3, "Changer les boutons", 8, 1)
    ];
    component.sprint.tickets = mockTicketList;

    // Act
    var resultTicketList : Ticket[] = component.filterTickets("Changer");
    
    //Assert
    expect(resultTicketList).toEqual(expectedTicketList);
  });

  it('onTicketClicked : emits to parent', () => {
    //Arrange
    spyOn(component.clickedTicket, 'emit')

    // Act
    const mockEvent : Ticket = new Ticket(3, "Ticket 1", 3, 3);
    component.onTicketClicked(mockEvent);
    
    //Assert
    expect(component.clickedTicket.emit).toHaveBeenCalledWith(mockEvent);
  });

  it('addTicket : calls ticketService with new ticket', () => {
    //Arrange
    const expectedTicket = new Ticket(0, "Nouveau Ticket", 0, 0);

    // Act
    component.addTicket();
    
    //Assert
    expect(createTicketSpy).toHaveBeenCalledWith(expectedTicket);
  });

  it('toggleModify : toggles flag', () => {
    //Arrange
    component.modify = true;

    // Act
    component.toggleModify();
    
    //Assert
    expect(component.modify).toBe(false);
  });

  it('modifyTitle : calls updateSprint', () => {
    //Arrange
    spyOn(component, 'updateSprint')


    // Act
    component.modifyTitle();
    
    //Assert
    expect(component.updateSprint).toHaveBeenCalled();
  });

  it('modifyTitle : calls toggleModify', () => {
    //Arrange
    spyOn(component, 'toggleModify')


    // Act
    component.modifyTitle();
    
    //Assert
    expect(component.toggleModify).toHaveBeenCalled();
  });

  it('updateSprint : calls server', () => {
    //Arrange
    const updateSprint = new Sprint(30, "Sprint test", [], false, true)
    component.sprint = updateSprint

    // Act
    component.updateSprint();
    
    //Assert
    expect(updateSprintSpy).toHaveBeenCalledOnceWith(updateSprint.id, updateSprint);
  });

  it('onDeleteSprint : emits to parent', () => {
    //Arrange
    component.sprint = new Sprint(30, "Sprint test", [], false, true)
    spyOn(component.deleteSprint, 'emit')

    // Act
    component.onDeleteSprint();
    
    //Assert
    expect(component.deleteSprint.emit).toHaveBeenCalledWith(component.sprint.id);
  });

});