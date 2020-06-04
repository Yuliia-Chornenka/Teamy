import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Subscription, Observable } from 'rxjs';
import { IProject } from '../../Models/project';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import {
  LoadingStartAction,
  LoadingFinishAction,
} from 'src/app/reducers/loading/loading.actions';
import { MatDialog } from '@angular/material/dialog';
import {
  AddMentorFormComponent,
  IUser,
} from './add-mentor-form/add-mentor-form.component';
import { selectMentors } from 'src/app/reducers/mentors/mentors.selector';
import { SaveMentorsAction } from 'src/app/reducers/mentors/mentors.actions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  project: IProject = {
    created_by: '5ed66bf1f9409f0017c8fb28',
    deadline: 1492946000000,
    description: 'You should resolve issue for remoute work',
    members: [{ id: 'someid', name: 'Ivan' }],
    mentors: [
      {
        _id: 'string',
        name: 'string',
        email: 'string',
        photo: 'string',
      },
    ],
    requirements: [
      { title: 'Use Angular Framework', priority: true },
      { title: 'Social Login', priority: true },
      { title: 'AWS', priority: false },
    ],
    teams: [{}],
    title: 'Angular Final Task',
    _id: '5ed4081334af460017bac211',
  };
  id: string;
  projectUrl: string;
  countDownText = {
    Days: 'Days:',
    Hours: 'Hours:',
    Minutes: 'Minutes:',
    Seconds: 'Seconds:',
  };
  isProjectOver = false;
  public mentors$: Observable<IUser[]> = this.store$.pipe(
    select(selectMentors)
  );

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store$: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => (this.id = params.id));
    this.getProject(this.id);
    this.projectUrl = window.location.href;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  getProject(projectId): void {
    this.store$.dispatch(new LoadingStartAction());

    this.subscriptions.add(
      this.projectService.getProject(projectId).subscribe(
        (project: IProject) => {
          console.log('Project from server:', project);
          this.project = project;
        },
        (err) => {
          this.openSnackBar(err.error.message, 'Error');
          this.store$.dispatch(new LoadingFinishAction());
        },
        () => {
          this.store$.dispatch(new SaveMentorsAction(this.project.mentors));
          this.store$.dispatch(new LoadingFinishAction());
        }
      )
    );
  }

  becomeMember(): void {
    this.subscriptions.add(
      this.projectService.becomeProjectMember(this.id).subscribe(
        (project: IProject) => {
          this.project.members = project.members;

          this.userService
            .addUserMemberProject(project)
            .subscribe((response: IProject) => {
              if (response) {
                this.openSnackBar(
                  'You have successfully confirmed your participation',
                  '✔'
                );
              }
            });
        },
        (err) => {
          this.openSnackBar(err.error.message, 'Error');
        }
      )
    );
  }

  showMessageCopiedLink() {
    this.openSnackBar('Link copied', '✔');
  }

  projectIsOverMessage(e) {
    this.isProjectOver = true;
  }

  openModalAddMentor() {
    this.dialog.open(AddMentorFormComponent);
  }
}
