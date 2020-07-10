 import { Component, VERSION } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'D3.js charts with Angular ' + VERSION.full + ' - By Itamar Serafim ';
	mode = new FormControl('side');
	opened: boolean = true;
}
