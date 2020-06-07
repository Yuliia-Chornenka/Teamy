import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Subscription, Observable } from 'rxjs';
import { IProject } from '../../models/project';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import {
  LoadingStartAction,
  LoadingFinishAction,
} from 'src/app/reducers/loading/loading.actions';
import { MatDialog } from '@angular/material/dialog';
import {
  AddMentorFormComponent,
  UserInterface,
} from './add-mentor-form/add-mentor-form.component';
import { selectMentors } from 'src/app/reducers/mentors/mentors.selector';
import { SaveMentorsAction } from 'src/app/reducers/mentors/mentors.actions';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  project: IProject;

  userId: string;
  projectAuthorId: string;
  isUserProjectCreator = false;

  id: string;
  projectUrl: string;
  countDownText = {
    Days: 'Days:',
    Hours: 'Hours:',
    Minutes: 'Minutes:',
    Seconds: 'Seconds:',
  };
  isProjectOver = false;
  public mentors$: Observable<UserInterface[]> = this.store$.pipe(
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
    this.getUserData();
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
          this.project = project;
          this.projectAuthorId = project.created_by;
        },
        (err) => {
          this.openSnackBar(err.error.message, 'Error');
          this.store$.dispatch(new LoadingFinishAction());
        },
        () => {
          this.isUserProjectCreator = this.userId === this.projectAuthorId;
          this.store$.dispatch(new SaveMentorsAction(this.project.mentors));
          this.store$.dispatch(new LoadingFinishAction());
        }
      )
    );
  }

  becomeMember(): void {
    this.subscriptions.add(
      this.projectService.becomeProjectMember({ projectId: this.id }).subscribe(
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

  showMessageCopied() {
    this.openSnackBar('Copied', '✔');
  }

  projectIsOverMessage(e) {
    this.isProjectOver = true;
  }

  openModalAddMentor() {
    this.dialog.open(AddMentorFormComponent, { data: { projectId: this.id } });
  }

  getUserData() {
    this.userService.getUserData().subscribe({
      next: (user: IUser) => {
        this.userId = user._id;
      },
      error: (err) => {
        this.openSnackBar('Sorry something went wrong. Please try again later.', 'ERROR');
      },
      complete: () => {
        this.getProject(this.id);
      }
    });
  }
}
