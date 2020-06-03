import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { AddNewMemberFormComponent } from '../add-new-member-form/add-new-member-form.component';
import { ProjectService } from '../../Services/project.service';
import { IUser } from '../../Models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingState } from 'src/app/reducers/loading/loading.reducer';
import { LoadingStartAction, LoadingFinishAction } from 'src/app/reducers/loading/loading.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-teams',
  templateUrl: './create-teams.component.html',
  styleUrls: [ './create-teams.component.scss' ]
})
export class CreateTeamsComponent implements OnInit {

  @Input() members: Array<object>;

  randomTeams = [];
  isTeamExist = false;
  isPending = false;
  formCreateTeams: FormGroup;
  successCreation = true;

  constructor(public dialog: MatDialog, private projectService: ProjectService,
              private snackBar: MatSnackBar, private store$: Store<LoadingState>) {
  }

  ngOnInit(): void {
    this.formCreateTeams = new FormGroup({
      quantity: new FormControl('', [ Validators.required, Validators.min(2), this.checkNumberOfTeams.bind(this) ]),
    });
  }

  checkNumberOfTeams(control: FormControl) {
    if (control.value >= this.members.length) {
      return {
        numberError: true
      };
    }
    return null;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000
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
    if (this.quantityControl.hasError('numberError')) {
      return 'The number of teams can’t be equal or more than the number of participants';
    }
    return this.quantityControl.hasError('min') ? 'At least 2 random teams' : '';
  }

  createRandomTeams(arrayOfStudents, numberOfTeams): void {
    this.isPending = true;
    this.formCreateTeams.disable();

    if (arrayOfStudents.length) {
      this.isPending = false;
      this.isTeamExist = true;
      this.successCreation = true;

      const numberOfParticipants = Math.floor(arrayOfStudents.length / numberOfTeams);

      for (let i = arrayOfStudents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ arrayOfStudents[i], arrayOfStudents[j] ] = [ arrayOfStudents[j], arrayOfStudents[i] ];
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
      this.successCreation = false;
      this.isPending = false;
      this.formCreateTeams.enable();
    }
  }

  addTeams(): void {
    console.log(this.randomTeams);

    this.successCreation = true;
    this.store$.dispatch(new LoadingStartAction());

    this.projectService.sendEmailToMembers().subscribe({
      next: (response) => {
        this.openSnackBar('Teams accepting and emails sent to everybody', '✔');
      },
      error: (err) => {
        this.successCreation = false;
        this.store$.dispatch(new LoadingFinishAction());
      },
      complete: () => {
        this.store$.dispatch(new LoadingFinishAction());
      }
    });
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
