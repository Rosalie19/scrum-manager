import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-tableau-points',
  standalone: true,
  imports: [],
  templateUrl: './tableau-points.component.html',
  styleUrl: './tableau-points.component.scss'
})
export class TableauPointsComponent {
  @Input() pointsList!: number[];
  @Input() totalPoints: number = 0;
}
