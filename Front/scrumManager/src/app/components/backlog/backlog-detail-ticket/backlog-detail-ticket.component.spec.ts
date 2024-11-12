import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BacklogDetailTicketComponent } from './backlog-detail-ticket.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket';
import { provideAnimations } from '@angular/platform-browser/animations';
describe('BacklogDetailTicketComponent', () => {
  let component: BacklogDetailTicketComponent;
  let fixture: ComponentFixture<BacklogDetailTicketComponent>;
  let ticketService: TicketService;
  let debugElement: DebugElement;
  let updateSpy: any;
  let createSpy: any;
  let deleteSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogDetailTicketComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), TicketService, provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BacklogDetailTicketComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();

    ticketService = debugElement.injector.get(TicketService);
    updateSpy = spyOn(ticketService, 'update').and.callThrough();
    createSpy = spyOn(ticketService, 'create').and.callThrough();
    deleteSpy = spyOn(ticketService, 'delete').and.callThrough();

  });

  
  it('onSubmit : update on server', () => {
    //Arrange 
    const mockCurrentTicket = new Ticket(12, "Ticket test", 2, 3)
    component.currentTicket = mockCurrentTicket

    //Act 
    component.onSubmit()

    //Assert
    expect(updateSpy).toHaveBeenCalledOnceWith(mockCurrentTicket.id, mockCurrentTicket);
  });

  it('onDelete : delete on server', () => {
    //Arrange 
    const mockCurrentTicket = new Ticket(12, "Ticket test", 2, 3)
    component.currentTicket = mockCurrentTicket

    //Act 
    component.onDelete()

    //Assert
    expect(deleteSpy).toHaveBeenCalledOnceWith(mockCurrentTicket.id);
  });

  it('onToggle :emits to parent', () => {
    //Arrange 
    spyOn(component.toggleDetails, 'emit')

    //Act 
    component.onToggle(true)

    //Assert
    expect(component.toggleDetails.emit).toHaveBeenCalledOnceWith(true);
  });


});