import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Subscription } from 'rxjs';
import { IProject } from '../../Models/project';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { LoadingState } from 'src/app/reducers/loading/loading.reducer';
import { LoadingStartAction, LoadingFinishAction } from 'src/app/reducers/loading/loading.actions';




@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  project: IProject;
  id: string;
  title = '';
  description = '';
  deadline: number;
  members = [];
  requirements = [];
  projectUrl: string;


  // {
  // created_by: "5ed3f50b31026a07f42c58e3"
  // deadline: 1592946000000
  // description: "test 2"
  // members: []
  // mentors: []
  // requirements: []
  // teams: []
  // title: "test 2"
  // _id: "5ed4081334af460017bac211"
  // }

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store$: Store<LoadingState>) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params.id);
    this.getProject(this.id);
    this.projectUrl = window.location.href;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }

  getProject(projectId): void {
    this.store$.dispatch(new LoadingStartAction());

    this.subscriptions.add(this.projectService.getProject(projectId).subscribe((project: IProject) => {
      console.log(project);
      this.project = project;
      this.title = project.title;
      this.description = project.description;
      this.deadline = project.deadline;
      this.requirements = project.requirements;
      this.members = project.members;
    }, err => { this.openSnackBar(err.error.message, 'Error'); }, () => { this.store$.dispatch(new LoadingFinishAction()); }));
  }

  becomeMember(): void {
    this.subscriptions.add(this.projectService.becomeProjectMember(this.id).subscribe((project: IProject) => {
      this.members = project.members;

      this.userService.addUserMemberProject(project).subscribe((response: IProject) => {
        if (response) {
          this.openSnackBar('You have successfully confirmed your participation', '✔');
        }
      });
    }, err => {
      this.openSnackBar(err.error.message, 'Error');
    }));
  }

  showMessageCopiedLink() {
    this.openSnackBar('Link copied', '✔');
  }
}
