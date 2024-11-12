import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageBacklogComponent } from './page-backlog.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Sprint } from '../../../models/sprint';
import { SprintService } from '../../../services/sprint.service';
import { DebugElement } from '@angular/core';
import { Ticket } from '../../../models/ticket';
describe('PageBacklogComponent', () => {
  let component: PageBacklogComponent;
  let fixture: ComponentFixture<PageBacklogComponent>;
  let sprintService: SprintService;
  let debugElement: DebugElement;
  let getAllSpy: any;
  let updateSpy: any;
  let createSpy: any;
  let deleteSpy: any;


  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [PageBacklogComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), SprintService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageBacklogComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();

    sprintService = debugElement.injector.get(SprintService);
    getAllSpy = spyOn(sprintService, 'getAll').and.callThrough();
    updateSpy = spyOn(sprintService, 'update').and.callThrough();
    createSpy = spyOn(sprintService, 'create').and.callThrough();
    deleteSpy = spyOn(sprintService, 'delete').and.callThrough();

  });


  it('loadData : calls SprintService', () => {
    //Act
    component.loadData();

    //Assert
    expect(getAllSpy).toHaveBeenCalled();
  });

  it('sortSprintsById : with sprints list', () => {
    //Arrange
    const sprintsList: Sprint[] = [
      new Sprint(2, "Sprint 1", [], false, false),
      new Sprint(0, "Sprint 2", [], false, true),
      new Sprint(1, "Sprint 3", [], false, false),
    ]

    const expectedSprints: Sprint[] = [
      new Sprint(0, "Sprint 2", [], false, true),
      new Sprint(1, "Sprint 3", [], false, false),
      new Sprint(2, "Sprint 1", [], false, false),
    ]

    //Act
    const resultSprints = component.sortSprintsById(sprintsList);

    //Assert
    expect(resultSprints).toEqual(expectedSprints);
  });

  it('sortSprintsById : with empty sprints list', () => {
    //Arrange
    const sprintsList: Sprint[] = []

    const expectedSprints: Sprint[] = []

    //Act
    const resultSprints = component.sortSprintsById(sprintsList);

    //Assert
    expect(resultSprints).toEqual(expectedSprints);
  });

  it('getBacklog : with sprints list containing backlog', () => {
    //Arrange
    const sprintsList: Sprint[] = [
      new Sprint(0, "Sprint 1", [], false, false),
      new Sprint(1, "Sprint 2", [], false, true),
      new Sprint(2, "Sprint 3", [], false, false),
    ]

    //Act
    var backlog = component.getBacklog(sprintsList);

    //Assert
    expect(backlog).toEqual(sprintsList[1]);
  });

  it('getBacklog : with sprints list not containing backlog', () => {
    //Arrange
    const sprintsList: Sprint[] = [
      new Sprint(0, "Sprint 1", [], false, false),
      new Sprint(1, "Sprint 2", [], false, false),
      new Sprint(2, "Sprint 3", [], false, false),
    ]
    const expectedBacklog: Sprint = new Sprint(-1, "", [], false, true);

    //Act
    var backlog = component.getBacklog(sprintsList);

    //Assert
    expect(backlog).toEqual(expectedBacklog);
  });

  it('getBacklog : with empty sprints list', () => {
    //Arrange
    const sprintsList: Sprint[] = []
    const expectedBacklog: Sprint = new Sprint(-1, "", [], false, true);

    //Act
    var backlog = component.getBacklog(sprintsList);

    //Assert
    expect(backlog).toEqual(expectedBacklog);
  });

  it('updateSprints : with sprints list', () => {
    //Arrange
    const sprintsList: Sprint[] = [
      new Sprint(0, "Sprint 1", [], false, false),
      new Sprint(1, "Sprint 2", [], false, false),
      new Sprint(2, "Sprint 3", [], false, false),
    ];
    component.sprints = sprintsList;

    //Act
    component.updateSprints();

    //Assert
    expect(updateSpy).toHaveBeenCalledTimes(3);
  });

  it('updateSprints : with empty sprints list', () => {
    //Arrange
    const sprintsList: Sprint[] = [];
    component.sprints = sprintsList;

    //Act
    component.updateSprints();

    //Assert
    expect(updateSpy).not.toHaveBeenCalled();
  });

  it('updateSprints : check service parameters', () => {
    //Arrange
    const sprintsList: Sprint[] = [
      new Sprint(32, "Sprint 1", [], true, false)
    ];
    component.sprints = sprintsList;
    //Act
    component.updateSprints();

    //Assert
    expect(updateSpy).toHaveBeenCalledOnceWith(32, new Sprint(32, "Sprint 1", [], true, false));
  });

  it('getConnectedDropLists : with sprints list', () => {
    //Arrange
    component.sprints = [
      new Sprint(10, "Sprint 9", [], false, false),
      new Sprint(25, "Sprint 1", [], false, false),
      new Sprint(7, "Sprint 5", [], false, false),
    ];
    const expectedList = [`sprint-0`, `sprint-1`, `sprint-2`, `sprint-3`]

    //Act
    var resultList = component.getConnectedDropLists();

    //Assert
    expect(resultList).toEqual(expectedList);
  });

  it('getConnectedDropLists : with empty sprints list', () => {
    //Arrange
    component.sprints = [];
    const expectedList = [`sprint-0`]

    //Act
    var resultList = component.getConnectedDropLists();

    //Assert
    expect(resultList).toEqual(expectedList);
  });

  it('addSprint : check service parameters', () => {
    //Arrange
    const expectedParameter: Sprint = new Sprint(100, "Nouveau sprint", [], false, false);

    //Act
    component.addSprint();

    //Assert
    expect(createSpy).toHaveBeenCalledOnceWith(expectedParameter);
  });

  it('onClickDelete : with id', () => {
    //Arrange
    component.popupQuestion = "";
    component.popupFlag = false;
    component.deleteId = 10;

    const expectedPopupQuestion = "Voulez-vous vraiment supprimer ce sprint? (Les tickets seront déplacés vers le backlog)"
    const expectedPopupFlag = true;
    const expectedDeleteId = 2
    //Act
    component.onClickDelete(2);

    //Assert
    expect(component.popupQuestion).toEqual(expectedPopupQuestion);
    expect(component.popupFlag).toEqual(expectedPopupFlag);
    expect(component.deleteId).toEqual(expectedDeleteId);
  });

  it('deleteSprint : updates backlog', () => {
    //Arrange
    const sprintToDelete = new Sprint(7, "Sprint 5", [new Ticket(3, "Ticket 3", 3, 2), new Ticket(5, "Ticket 6", 8, 0)], false, false);
    component.sprints = [
      new Sprint(10, "Sprint 9", [], false, false),
      new Sprint(25, "Sprint 1", [new Ticket(1, "Ticket 1", 2, 0)], false, true),
      sprintToDelete
    ];
    const expectedBaklog: Sprint = new Sprint(
      25,
      "Sprint 1",
      [new Ticket(1, "Ticket 1", 2, 0), new Ticket(3, "Ticket 3", 3, 2), new Ticket(5, "Ticket 6", 8, 0)],
      false,
      true);

    //Act
    component.deleteSprint(sprintToDelete);

    //Assert
    expect(updateSpy).toHaveBeenCalledOnceWith(expectedBaklog.id, expectedBaklog);
  });

  it('onPopupClicked : with false flag', () => {
    //Arrange
    component.popupFlag = true
    component.deleteId = 7
    const sprintToDelete = new Sprint(7, "Sprint 5", [new Ticket(3, "Ticket 3", 3, 2), new Ticket(5, "Ticket 6", 8, 0)], false, false);
    component.sprints = [
      new Sprint(10, "Sprint 9", [], false, false),
      new Sprint(25, "Sprint 1", [new Ticket(1, "Ticket 1", 2, 0)], false, true),
      sprintToDelete
    ];
    let callbackSpy = spyOn(component, 'deleteSprint').and.callThrough();

    //Act
    component.onPopupClicked(true);

    //Assert
    expect(callbackSpy).toHaveBeenCalledOnceWith(sprintToDelete);
  });

  it('onPopupClicked : no matching sprint', () => {
    //Arrange
    component.popupFlag = true
    component.deleteId = 7
    component.sprints = [
      new Sprint(10, "Sprint 9", [], false, false),
      new Sprint(25, "Sprint 1", [new Ticket(1, "Ticket 1", 2, 0)], false, true)
    ];
    let callbackSpy = spyOn(component, 'deleteSprint').and.callThrough();


    //Act & Assert
    expect(() => component.onPopupClicked(true)).toThrowError("Sprint not found");
    expect(callbackSpy).not.toHaveBeenCalled();
  });

  it('onPopupClicked : toggles popupFlag', () => {
    //Arrange
    component.popupFlag = true
    component.deleteId = 7
    component.sprints = [
      new Sprint(10, "Sprint 9", [], false, false),
      new Sprint(25, "Sprint 1", [new Ticket(1, "Ticket 1", 2, 0)], false, true),
      new Sprint(7, "Sprint 5", [new Ticket(3, "Ticket 3", 3, 2), new Ticket(5, "Ticket 6", 8, 0)], false, false)];

    //Act
    component.onPopupClicked(true);

    //Assert
    expect(component.popupFlag).toBe(false);
  });

  it('openDetails : changes global variable', () => {
    //Arrange
    component.clickedTicket = new Ticket(0, "", 0, 0)
    const expectedTicket = new Ticket(2, "Ticket 2", 10, 0)

    //Act
    component.openDetails(expectedTicket);

    //Assert
    expect(component.clickedTicket).toBe(expectedTicket);
  });

  it('openDetails : calls toggleDetails', () => {
    //Arrange
    component.clickedTicket = new Ticket(0, "", 0, 0)
    const expectedTicket = new Ticket(2, "Ticket 2", 10, 0)
    let callbackSpy = spyOn(component, 'toggleDetails').and.callThrough();
    //Act
    component.openDetails(expectedTicket);

    //Assert
    expect(callbackSpy).toHaveBeenCalledOnceWith(true);
  });

  it('toggleDetails : changes global variable', () => {
    //Arrange
    component.details = false;

    //Act
    component.toggleDetails(true);

    //Assert
    expect(component.details).toBe(true);
  });

  it('toggleDetails : calls loadData', () => {
    //Arrange
    let callbackSpy = spyOn(component, 'loadData').and.callThrough();

    //Act
    component.toggleDetails(true);

    //Assert
    expect(callbackSpy).toHaveBeenCalled();
  });
});