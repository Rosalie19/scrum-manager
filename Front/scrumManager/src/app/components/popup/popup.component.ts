import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input() question!: string;
  @Output() answer = new EventEmitter<boolean>();

  /**
   * Send to the parent the response to the question
   * @param data yes or no 
   */
  answerClicked(data : boolean) : void{
    this.answer.emit(data)
  }

}
