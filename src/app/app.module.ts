import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialComponentsModule } from './shared/material-components/material-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ThreeDCarrousselModule } from './components/three-d-carroussel/three-d-carroussel.module';
import { AppRoutingModule } from './routing.module';
import { BasicChartModule } from './shared/basic-chart/basic-chart.module';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { CacheService } from './core/cache.service';
import { CacheInteceptor } from './core/cache.interceptor';
import { ConnectDotsComponent } from './components/connect-dots/connect-dots.component';


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
  declarations: [
    AppComponent,
    HomeComponent,
    CurriculumComponent,
    ConnectDotsComponent
    ],
  providers: [
    CacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInteceptor, multi: true }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
