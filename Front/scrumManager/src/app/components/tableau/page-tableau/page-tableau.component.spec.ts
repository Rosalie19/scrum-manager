import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTableauComponent } from './page-tableau.component';
import { Ticket } from '../../../models/ticket';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
describe('PageTableauComponent', () => {
  let component: PageTableauComponent;
  let fixture: ComponentFixture<PageTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTableauComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('updateSum : with tickets list', () => {
    //Arrange
    var total: number = 4;
    const ticketList: Ticket[] = [
      new Ticket(0, "", 2, 0),
      new Ticket(0, "", 3, 0),
      new Ticket(0, "", 1, 0),
    ]
    const expectedTotal: number = 6

    //Act
    total = component.updateSum(ticketList);


    //Assert
    expect(total).toBe(expectedTotal, "It should return the correct total");
  });

  it('updateSum : with empty tickets list', () => {
    //Arrange
    var total: number = 4;
    const ticketList: Ticket[] = [
    ]
    const expectedTotal: number = 0

    //Act
    total = component.updateSum(ticketList);


    //Assert
    expect(total).toBe(expectedTotal, "It should return the correct total");
  });

  it('updateAllSums : updates all the sums', () => {
    //Arrange
    component.sumList = [0, 0, 3];
    component.columnList = [["",
      [new Ticket(0, "", 2, 0),
      new Ticket(0, "", 3, 0),
      new Ticket(0, "", 1, 0),]
    ],
    ["",
      [new Ticket(0, "", 1, 0),
      new Ticket(0, "", 0, 0)]
    ],
    ["", []]];

    const expectedSums: number[] = [6, 1, 0]

    //Act
    component.updateAllSums();

    //Assert
    expect(component.sumList).toEqual(expectedSums, "It should return the correct total");
  });

  it('updateTotal : updates the points total', () => {
    //Arrange
    component.sumList = [5, 0, 3];
    const expectedTotal: number = 8;

    //Act
    var total: number = component.updateTotal(component.sumList);

    //Assert
    expect(total).toEqual(expectedTotal, "It should return the correct total");
  });

  it('updateTotal : with empty sumlist', () => {
    //Arrange
    component.sumList = [];
    const expectedTotal: number = 0;

    //Act
    var total: number = component.updateTotal(component.sumList);

    //Assert
    expect(total).toEqual(expectedTotal, "It should return the correct total");
  });

  it('updateColumns : updates all the columns', () => {
    //Arrange
    var ticketsList: Ticket[] = [
      new Ticket( 1, "", 0, 3 ),
      new Ticket( 2, "", 1, 10 ),
      new Ticket(  3, "", 0, 2 ),
      new Ticket( 4, "", 3, 8 )];

    const expectedColumns: [string, Ticket[]][] = [
      ["À faire",
      [new Ticket(1, "", 3, 0),
      new Ticket(3, "", 2, 0)]
    ],
    ["En cours",
      [
        new Ticket(2, "", 10, 1),
      ]],
    ["À tester", []],
    ["Terminé", [
      new Ticket(4, "", 8, 3)
    ]],
    ]

    //Act
    component.updateColumns(ticketsList);

    //Assert
    expect(component.columnList).toEqual(expectedColumns, "It should return the correct columns");
  });

  it('emptyColumns : empties the columns', () => {
    //Arrange
    component.columnList = [["",
      [new Ticket(0, "", 1, 0),
      new Ticket(0, "", 3, 0)]
    ],
    ["",
      [
        new Ticket(0, "", 2, 1),
      ]],
    ["", []],
    ["", [
      new Ticket(0, "", 4, 3)
    ]],
    ];

    const expectedColumns: [string, Ticket[]][] = [["À faire", []], ["En cours", []], ["À tester", []], ["Terminé", []]];

    //Act
    component.emptyColumns()

    //Assert
    expect(component.columnList).toEqual(expectedColumns, "There shoudn't be any ticket");
  });


});