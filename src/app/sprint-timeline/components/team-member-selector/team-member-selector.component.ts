import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete";
import { startWith, map, filter, distinctUntilChanged } from "rxjs/operators";
import { MatChipInputEvent } from "@angular/material/chips";
import { HttpClient } from "@angular/common/http";

import { TeamMember } from "../interfaces/team-member";

@Component({
  selector: "app-team-member-selector",
  templateUrl: "./team-member-selector.component.html",
  styleUrls: ["./team-member-selector.component.scss"]
})
export class TeamMemberSelectorComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  memberCtrl = new FormControl();

  submitMessages: {
    // FIXME: We may need to create an interface for this.
    success?: string;
    error?: string;
    waiting?: string;
  };

  teamMembersUrl = "";

  @ViewChild("memberInput") memberInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTeamMembers();
  // debugger;
    this.memberCtrl.valueChanges
    .pipe(
      filter(val => (val || '').length >= 2),
      distinctUntilChanged(),
    )
    .subscribe((val) => {

        const filter = (val || '').trim().toLowerCase();
        console.log(filter);
        this.teamMembers.forEach(member => {
          member.filtered = (member.name || '').toLowerCase().indexOf(val.trim()) === -1;
        });
    });
  }

  getTeamMembers() {
    this.submitMessages = { waiting: "Getting team members..." };
    this.http.get(this.teamMembersUrl, {headers: {'cacheable': 'true'}}).subscribe({
      next: (teamMembers: TeamMember[]) => {
        this.teamMembers = teamMembers;
        this.submitMessages = {};
      },
      error: responseError => {
        this.submitMessages = { error: "Error getting team members." };
      }
    });
  }

  get selectedMembers(): TeamMember[] {
    return this.teamMembers.filter(member => member.selected);
  }
  get unSelectedMembers(): TeamMember[] {
    return this.teamMembers.filter(
      member => !member.selected && !member.filtered
    );
  }

  add(event: MatChipInputEvent): void {
    this.memberInput.nativeElement.value = "";
  }

  remove(member: TeamMember): void {
    member.selected = false;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const member: TeamMember = event.option.value;
    member.selected = true;
    this.teamMembers.forEach(item => (item.filtered = false));
    this.memberInput.nativeElement.value = "";
  }

  blur() {
    this.memberInput.nativeElement.blur();
  }
}
