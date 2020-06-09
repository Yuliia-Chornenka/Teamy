import { Component, OnInit } from '@angular/core';
import { IProject } from '../../models/project';
import { IProjectTeam } from '../../models/projectTeam';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingState } from 'src/app/reducers/loading/loading.reducer';
import { LoadingStartAction, LoadingFinishAction } from 'src/app/reducers/loading/loading.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-created-team-card',
  templateUrl: './created-team-card.component.html',
  styleUrls: ['./created-team-card.component.scss']
})
export class CreatedTeamCardComponent implements OnInit {

  projectId: string;
  projectTeams: Array<[IProjectTeam]>;

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
              private snackBar: MatSnackBar, private store$: Store<LoadingState>) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => (this.projectId = params.id));
    this.getProject(this.projectId);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  getProject(id): void {
    this.store$.dispatch(new LoadingStartAction());
    this.projectService.getProject(id).subscribe({
      next: (project: IProject) => {
        this.projectTeams = project.teams;
      },
      error: (err) => {
        this.openSnackBar('Sorry something went wrong. Please try again later.', 'ERROR');
      },
      complete: () => {
        this.store$.dispatch(new LoadingFinishAction());
      },
    });
  }
}
