import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MentorsState } from 'src/app/reducers/mentors/mentors.reducer';
import { AddMentorAction } from 'src/app/reducers/mentors/mentors.actions';
import { ProjectService } from 'src/app/Services/project.service';

export interface IUser {
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
    private projectService: ProjectService
  ) {}

  addMentorForm: FormGroup;
  choosenMentor: IUser;
  users: IUser[] = [
    {
      _id: '5ecbbf5ce3dd0c00175a2333',
      name: 'Yulia',
      email: '123@123',
      photo:
        'https://teamy.s3.amazonaws.com/1590950911791iconfinder_Man-16_379442.png',
    },
    {
      _id: '5ece228b2951dd8074068ef7',
      name: 'Dima',
      email: 'd.kashmensky@gmail.com',
      photo: 'https://teamy.s3.amazonaws.com/1591031186144EP_AM-logo.png',
    },
    {
      _id: '5ece612cecd48f17737e5880',
      name: 'eva',
      email: 'eva@gmail.com',
      photo: '',
    },
    {
      _id: '5ecf9222f94f9e00174a3e49',
      name: 'mama',
      email: 'mama@ma',
      photo:
        'https://teamy.s3.amazonaws.com/159110316090349151104_2201823946516029_4834081813016084480_n.jpg',
    },
    {
      _id: '5ecfa00d10a24e6875798e02',
      name: 'mama',
      email: 'mammma@ma',
      photo: '',
    },
    {
      _id: '5ed52ecabb084600172883d3',
      name: 'Tester',
      email: 'Dk@example.com',
      photo: '',
    },
    {
      _id: '5ed544e9bb0846001728840b',
      name: 'Юлія',
      email: '1234@1234',
      photo: '',
    },
    {
      _id: '5ed54665bb0846001728840d',
      name: 'Yulia Black',
      email: 'blackyulia583@gmail.com',
      photo: 'https://teamy.s3.amazonaws.com/1591196446015Git.docx',
    },
    {
      _id: '5ed66bf1f9409f0017c8fb28',
      name: 'Ivan',
      email: 'davane4ek@gmail.com',
      photo:
        'https://teamy.s3.amazonaws.com/15911189851838069da92-96a5-4ad6-bb93-6b302a7dbbb4.jpg',
    },
    {
      _id: '5ed7fa65b687ecfed0ba3507',
      name: 'Eva Alexandrovna',
      email: 'userdotsenko@gmail.com',
      photo: 'https://graph.facebook.com/1130474703989684/picture?type=normal',
    },
    {
      _id: '5ed7fc24d0bc27ad541226c7',
      name: 'Дмитрий Кашменский',
      email: 'd.kashmensky@gmail.com',
      photo: 'https://graph.facebook.com/3133964389975873/picture?type=normal',
    },
  ];
  filteredUsers: Observable<IUser[]>;

  ngOnInit(): void {
    this.addMentorForm = this.fb.group({
      mentorName: '',
    });

    this.filteredUsers = this.addMentorForm.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
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
  }

  onSubmit() {
    this.projectService
      .becomeProjectMentor({
        projectId: '5ed66dc4f9409f0017c8fb29',
        mentor: this.choosenMentor,
      })
      .subscribe({
        next: () => {},
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.store$.dispatch(new AddMentorAction(this.choosenMentor));
          this.dialogRef.close();
        },
      });
  }
}
