import { Component, Input} from '@angular/core';
import { NgForOf,NgClass } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgForOf, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  @Input() currentPage! :  string;
  @Input() projectName: string = "Project";
  pages : string[] = ["Tableau", "Backlog"]

  constructor(private router: Router) {}

  navigateTo(page: string): void {
    this.currentPage = page;
    this.router.navigate([page.toLowerCase()+"/1"]);
  }
}
