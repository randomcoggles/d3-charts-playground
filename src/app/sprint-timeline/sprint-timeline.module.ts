import { NgModule } from "@angular/core";
import { SprintTimelineComponent } from "./sprint-timeline.component";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "../shared/material-components/material-components.module";
import { NewSprintComponent } from "./components/new-sprint/new-sprint.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TeamMemberSelectorComponent } from "./components/team-member-selector/team-member-selector.component";

const routes: Routes = [
  {
    path: "",
    component: SprintTimelineComponent,
    // children: [
      // {
      //   path: "",
      //   redirectTo: "new-sprint",
      //   pathMatch: "full"

      //   // component: NewSprintComponent
      // },
      // {
      //   path: "new-sprint",
      //   component: NewSprintComponent
      // }
    // ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SprintTimelineComponent, 
    NewSprintComponent,
    TeamMemberSelectorComponent
    ]
})
export class SprintTimelineModule {}
