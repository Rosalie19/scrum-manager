import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Sprint } from '../../../models/sprint';
import { SprintService } from '../../../services/sprint.service';
@Component({
  selector: 'app-page-project',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './page-project.component.html',
  styleUrl: './page-project.component.scss'
})
export class PageProjectComponent {
  project: Project = new Project(-1, "", "", []);
  sprints: Sprint[] = [];
  constructor(private route: ActivatedRoute, private projectService: ProjectService, private sprintService: SprintService) { }

  ngOnInit(): void {
    // Get the project
    this.route.paramMap.subscribe(params => {
      this.loadProjectData(params.get('project') as unknown as number); // Call your method to load project data based on the project ID
    });

    this.loadSprints();
  }

  loadProjectData(id: number): void {
    this.projectService.get(id).subscribe(response => {
      this.project = response as Project
    })
  }

  loadSprints(): void {
    this.sprintService.getAll().subscribe(response => {
      this.sprints = response as Sprint[];
    })
  }

  getTotalPoints(sprint: Sprint): number {
    var total = 0;
    for (let ticket of sprint.tickets) {
      total += ticket.points
    }
    return total
  }

  getStartedSprint(sprints: Sprint[]): Sprint {
    for (let sprint of sprints) {
      if (sprint.started) {
        return sprint
      }
    }
    return new Sprint(0, "", [], true, false)
  }

  getFinishedPoints(sprint: Sprint): number {
    var total = 0;
    for (let ticket of sprint.tickets) {
      if (ticket.status == 3) {
        total += ticket.points
      }
    }
    return total
  }

}
