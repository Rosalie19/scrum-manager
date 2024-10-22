import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTableauComponent } from './page-tableau.component';
import { TicketScrum } from '../../../models/ticket-scrum';

describe('PageTableauComponent', () => {
  let component: PageTableauComponent;
  let fixture: ComponentFixture<PageTableauComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ PageTableauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('updateSum : returns the correct number', () => {
    //Arrange
    var total = 4;
    const ticketList  = [
      new TicketScrum(0,"", 2, 0),
      new TicketScrum(0,"", 3, 0),
      new TicketScrum(0,"", 1, 0),
    ]
    const expectedTotal = 6

    //Act
    total = component.updateSum(ticketList);


    //Assert
    expect(total).toBe(expectedTotal, "It should return the correct total");
  });

  it('updateAllSums : updates all the sums', () => {
    //Arrange
    component.sumList = [0,0,3];
    component.columnList  = [[
      new TicketScrum(0,"", 2, 0),
      new TicketScrum(0,"", 3, 0),
      new TicketScrum(0,"", 1, 0),
    ], 
    [
      new TicketScrum(0,"", 1, 0),
      new TicketScrum(0,"", 0, 0)
    ],
    []];

    const expectedSums = [6,1,0]

    //Act
    component.updateAllSums();

    //Assert
    expect(component.sumList).toEqual(expectedSums, "It should return the correct total");
  });

  it('updateColumns : updates all the columns', () => {
    //Arrange
    var ticketsList =[ {
      id : 1, 
      title : "", 
      status : 0
    }, 
    {
      id : 2, 
      title : "", 
      status : 1
    },
    {
      id : 3, 
      title : "", 
      status : 0
    },
    {
      id : 4, 
      title : "", 
      status : 3
    }];
    component.columnList  = [
    [], 
    [],
    [],
    []];

    const expectedColumns = [[
      new TicketScrum(0, "", 1, 0),
      new TicketScrum(0, "", 3, 0)
    ],
    [
      new TicketScrum(0, "", 2, 1),
    ],
    [
    ],
    [
      new TicketScrum(0, "", 4, 3)
    ],
  ]

    //Act
    component.updateColumns(ticketsList);

    //Assert
    expect(component.columnList).toEqual(expectedColumns, "It should return the correct collumns");
  });

  it('updateTotal : updates the points total', () => {
    //Arrange
    component.sumList = [5, 0, 3];
    const expectedTotal = 8;

    //Act
    var total = component.updateTotal(component.sumList);

    //Assert
    expect(total).toEqual(expectedTotal, "It should return the correct total");
});


});