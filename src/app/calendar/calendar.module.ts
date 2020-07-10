
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../shared/material-components/material-components.module';
import { FormsModule } from '@angular/forms';
import { TesteComponent } from './recurrence/teste';
import { RecurrenceConfigComponent } from './recurrence/recurrence-config.component';

const routes: Routes = [
  { path: '', component: CalendarComponent}
]

@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    RouterModule.forChild(routes)
    ],
  declarations: [
    CalendarComponent,
    RecurrenceConfigComponent,
    TesteComponent
  ]
})
export class CalendarModule {}