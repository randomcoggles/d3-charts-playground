
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedTypescriptComponent } from './advanced-typescript.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedTypescriptComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AdvancedTypescriptModule {}