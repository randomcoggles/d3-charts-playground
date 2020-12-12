import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { ConnectDotsComponent } from './components/connect-dots/connect-dots.component';

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
  },
  {
    path: 'onboarding',
    loadChildren: 
    () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule)
  },
  {
    path: 'connect-dots',
    component: ConnectDotsComponent
  },
  {
    path: 'under-construction',
    component: UnderConstructionComponent
  },
  {
    path: 'advanced-typescript',
    loadChildren: 
    () => import('./advanced-typescript/advanced-typescript.module').then(m => m.AdvancedTypescriptModule)
  },
  {
    path: 'rxjs-use-cases',
    loadChildren: 
    () => import('./rxjs-use-cases/rxjs-use-cases.module').then(m => m.RxjsUseCasesModule)
  }
  
  // {
  //   path: 'form-design',
  //   loadChildren: 
  //   () => import('./form-design/form-design.module').then(m => m.FormDesignModule)
  // }
]
export const AppRoutingModule = RouterModule.forRoot(routes);
