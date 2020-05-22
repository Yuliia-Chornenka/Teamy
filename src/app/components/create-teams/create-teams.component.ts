import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { AddNewMemberFormComponent } from '../add-new-member-form/add-new-member-form.component';

@Component({
  selector: 'app-create-teams',
  templateUrl: './create-teams.component.html',
  styleUrls: ['./create-teams.component.scss']
})
export class CreateTeamsComponent implements OnInit {

  @Input() members: Array<string>;

  randomTeams = [];
  isTeamExist = false;
  isPending = false;
  formCreateTeams: FormGroup;
  successCreation = true;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.formCreateTeams = new FormGroup({
      quantity: new FormControl('', [ Validators.required, Validators.min(2) ]),
    });
  }

  openDialogNewMember() {
    this.dialog.open(AddNewMemberFormComponent);
  }

  get quantityControl(): AbstractControl {
    return this.formCreateTeams.get('quantity');
  }

  getErrorQuantity(): string {
    if (this.quantityControl.hasError('required')) {
      return 'You must enter a number';
    }
    return this.quantityControl.hasError('min') ? 'At least 2 randomTeams' : '';
  }

  createRandomTeams(arrayOfStudents, numberOfTeams): void {
    this.isPending = true;

    if (arrayOfStudents.length) {
      this.isPending = false;
      this.isTeamExist = true;

      const numberOfParticipants = Math.floor(arrayOfStudents.length / numberOfTeams);

      for (let i = arrayOfStudents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayOfStudents[i], arrayOfStudents[j]] = [arrayOfStudents[j], arrayOfStudents[i]];
      }

      for (let i = 1; i <= numberOfTeams; i++) {
        const team = arrayOfStudents.splice(0, numberOfParticipants);
        this.randomTeams.push(team);
      }

      if (arrayOfStudents.length) {
        arrayOfStudents.forEach((student, index) => {
          this.randomTeams[index].push(student);
        });
      }
    } else {
      this.isTeamExist = false;
    }
  }

  addTeams(): void {
    console.log(this.randomTeams);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
