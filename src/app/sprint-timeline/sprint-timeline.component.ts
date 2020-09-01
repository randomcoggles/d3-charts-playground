import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-sprint-timeline',
  templateUrl: './sprint-timeline.component.html',
  styleUrls: ['./sprint-timeline-2.component.scss']
})
export class SprintTimelineComponent {
  sprints: any[];

  constructor(private http: HttpClient) {
    
    this.http.get("./assets/mock-sprints.json", {headers: {'cacheable': 'true'}}).subscribe(
      response => {
        this.sprints = (response as any[] || []).reverse();
        this.sprints.forEach(sprint => {
          const retro = sprint.retrospective || {};
          retro.showing = 'green';
        })
      },
      error => {
        console.log(error);
      }
    );
  }
}