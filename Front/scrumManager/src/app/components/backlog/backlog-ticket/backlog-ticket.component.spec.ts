import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogTicketComponent } from './backlog-ticket.component';
import { Ticket } from '../../../models/ticket';

describe('BacklogTicketComponent', () => {
  let component: BacklogTicketComponent;
  let fixture: ComponentFixture<BacklogTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklogTicketComponent);
    component = fixture.componentInstance;
    component.ticket = new Ticket(2, "Ticekt 2", 3, 0)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
