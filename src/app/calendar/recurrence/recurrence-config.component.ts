import { Component } from "@angular/core";

@Component({
  selector: 'app-recurrence-config',
  templateUrl: './recurrence-config.component.html',
  styleUrls: ['./recurrence-config.component.scss']
})
export class RecurrenceConfigComponent {
  recurrencePattern: {
    frequencyType: string;

  }
  constructor() {
    console.log('...');
  }
}