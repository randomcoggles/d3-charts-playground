import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialComponentsModule } from './shared/material-components/material-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ThreeDCarrousselModule } from './components/three-d-carroussel/three-d-carroussel.module';
import { AppRoutingModule } from './routing.module';
import { BasicChartModule } from './shared/basic-chart/basic-chart.module';
import { CurriculumComponent } from './components/curriculum/curriculum.component';


const routes: Routes = [  
	{ path: 'home', component: HomeComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'simple-charts', 
    loadChildren: 
    // './simple-charts/simple-charts.module#SimpleChartsModule'
    () => import('./simple-charts/simple-charts.module').then(m => m.SimpleChartsModule)
  },
  { 
    path: 'interactive-charts', 
    loadChildren: 
    // './simple-charts/simple-charts.module#SimpleChartsModule'
    () => import('./simple-charts/simple-charts.module').then(m => m.SimpleChartsModule)
  }
]
// const AppRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  imports:      [
    CommonModule,
	  BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialComponentsModule,
    ThreeDCarrousselModule,
    BasicChartModule
    
    ],
  declarations: [ AppComponent, HomeComponent, CurriculumComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
