import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class Timeline {
  
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