import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';

const routes: Routes = [  
	{ path: 'curriculum', component: CurriculumComponent },
	{ path: 'home', component: HomeComponent },
  
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'simple-charts', 
    loadChildren:
    () => import('./simple-charts/simple-charts.module').then(m => m.SimpleChartsModule)
  },
  { 
    path: 'interactive-charts', 
    loadChildren:
    () => import('./interactive-charts/interactive-charts.module').then(m => m.InteractiveChartsModule)
  },
  { 
    path: 'custom-charts', 
    loadChildren:
    () => import('./custom-charts/custom-charts.module').then(m => m.CustomChartsModule)
  },
  { 
    path: 'calendar', 
    loadChildren:
    () => import('./calendar/calendar.module').then(m => m.CalendarModule)
  },
  { 
    path: 'sprint-timeline', 
    loadChildren:
    () => import('./sprint-timeline/sprint-timeline.module').then(m => m.SprintTimelineModule)
  }
]
export const AppRoutingModule = RouterModule.forRoot(routes);
