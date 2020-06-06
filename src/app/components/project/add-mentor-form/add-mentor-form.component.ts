import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MentorsState } from 'src/app/reducers/mentors/mentors.reducer';
import { AddMentorAction } from 'src/app/reducers/mentors/mentors.actions';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  photo: string;
}

@Component({
  selector: 'app-add-mentor-form',
  templateUrl: './add-mentor-form.component.html',
  styleUrls: ['./add-mentor-form.component.scss'],
})
export class AddMentorFormComponent implements OnInit {
  constructor(
    private store$: Store<MentorsState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddMentorFormComponent>,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  addMentorForm: FormGroup;
  choosenMentor: UserInterface;
  users: UserInterface[];
  filteredUsers: Observable<UserInterface[]>;
  projectId: string;
  clickOnOption = false;
  membersMode = false;

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        this.openSnackBar(err.error.message, 'Error');
      },
      complete: () => {},
    });

    this.addMentorForm = this.fb.group({
      mentorName: '',
    });

    this.filteredUsers = this.addMentorForm.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.membersMode = this.data.membersMode || false;
  }

  private _filter(value) {
    if (!value.mentorName) {
      return [];
    }

    const filterValue = value.mentorName.toLowerCase();

    return this.users.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
  }

  OnUserSelected(user) {
    this.choosenMentor = user;
    this.clickOnOption = true;
  }

  onSubmit() {
    if (!this.clickOnOption) {
      this.openSnackBar('Choose user from the list', 'Error');
      return;
    }

    if (this.membersMode) {
      this.projectService
        .becomeProjectMember({
          projectId: this.data.projectId,
          member: this.choosenMentor,
        })
        .subscribe({
          next: (resp) => {
            console.log('Add member response', resp);
          },
          error: (err) => {
            this.openSnackBar(err.error.message, 'Error');
          },
          complete: () => {
            this.addMentorForm.reset();
            this.dialogRef.close();
          },
        });
      return;
    }

    this.projectService
      .becomeProjectMentor({
        projectId: this.data.projectId,
        mentor: this.choosenMentor,
      })
      .subscribe({
        next: () => {},
        error: (err) => {
          this.openSnackBar(err.error.message, 'Error');
          this.addMentorForm.reset();
        },
        complete: () => {
          this.store$.dispatch(new AddMentorAction(this.choosenMentor));
          this.dialogRef.close();
        },
      });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
