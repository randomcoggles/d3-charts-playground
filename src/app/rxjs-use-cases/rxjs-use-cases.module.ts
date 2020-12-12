import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RxjsUseCasesComponent } from './rxjs-use-cases.component';



@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: RxjsUseCasesComponent
    }])
  ],
  declarations: [RxjsUseCasesComponent]
})
export class RxjsUseCasesModule {}