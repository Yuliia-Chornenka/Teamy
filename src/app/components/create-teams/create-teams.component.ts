import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

// import { AddNewMemberFormComponent } from '../add-new-member-form/add-new-member-form.component';
import { ProjectService } from '../../services/project.service';
import { IUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { IProject } from '../../models/project';
import { LoadingState } from 'src/app/reducers/loading/loading.reducer';
import {
  LoadingStartAction,
  LoadingFinishAction,
} from 'src/app/reducers/loading/loading.actions';
import { AddMentorFormComponent, UserInterface } from '../project/add-mentor-form/add-mentor-form.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-create-teams',
  templateUrl: './create-teams.component.html',
  styleUrls: [ './create-teams.component.scss' ],
})
export class CreateTeamsComponent implements OnInit {
  @Input() members: Array<object>;

  randomTeams = [];
  isTeamExist = false;
  isPending = false;
  formCreateTeams: FormGroup;
  successCreation = true;
  projectInfo: IProject;
  isEmailSend = false;

  projectId: string;
  userId: string;
  projectAuthorId: string;
  isUserProjectCreator = false;

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private chatService: ChatService,
    private snackBar: MatSnackBar,
    private store$: Store<LoadingState>,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => (this.projectId = params.id)
    );
    this.getUserData();
    this.formCreateTeams = new FormGroup({
      quantity: new FormControl('', [
        Validators.required,
        Validators.min(2),
        this.checkNumberOfTeams.bind(this),
      ]),
    });
  }

  checkNumberOfTeams(control: FormControl) {
    if (this.members && control.value >= this.members.length) {
      return {
        numberError: true,
      };
    }
    return null;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  openDialogNewMember() {
    this.dialog.open(AddMentorFormComponent, {
      data: {projectId: this.projectId, membersMode: true},
    });
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
    return this.quantityControl.hasError('min')
      ? 'At least 2 random teams'
      : '';
  }

  createRandomTeams(arrayOfStudents, numberOfTeams): void {
    this.isPending = true;
    this.formCreateTeams.disable();

    if (arrayOfStudents.length) {
      this.isPending = false;
      this.isTeamExist = true;
      this.successCreation = true;

      const numberOfParticipants = Math.floor(
        arrayOfStudents.length / numberOfTeams
      );

      for (let i = arrayOfStudents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ arrayOfStudents[i], arrayOfStudents[j] ] = [
          arrayOfStudents[j],
          arrayOfStudents[i],
        ];
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
    this.successCreation = true;
    this.store$.dispatch(new LoadingStartAction());

    let author = {};
    this.userService.getUser(this.projectInfo.created_by).subscribe({
        next: (projectCreator: IUser) => {
          author = {
            user_id: projectCreator._id,
            user_name: projectCreator.name
          };        },
        error: (err) => {
          this.successCreation = false;
          this.store$.dispatch(new LoadingFinishAction());
        },
        complete: () => {
          this.store$.dispatch(new LoadingFinishAction());

          this.randomTeams.forEach((team, index: number) => {
            const members = [];
            team.forEach((member) => {
              members.push({
                user_id: member._id,
                user_name: member.name
              });
            });

            const mentors = [];
            this.projectInfo.mentors.forEach((mentor: UserInterface) => {
              mentors.push({
                user_id: mentor._id,
                user_name: mentor.name
              });
            });
            mentors.push(author);

            const teamItem = {
              index,
              team: {
                  projectId: this.projectInfo._id,
                  projectName: this.projectInfo.title,
                  members,
                  mentors
                }
            };

            this.chatService.createTeam(teamItem).subscribe({
              next: (result) => {
                team.forEach((member) => {
                  const infoForEmail = {
                    userEmail: member.email,
                    userName: member.name,
                    projectTitle: this.projectInfo.title,
                    projectId: this.projectInfo._id,
                    teamId: result.teamId,
                  };

                  this.projectService.sendEmailToMembers(infoForEmail).subscribe({
                    next: (response) => {
                      this.isEmailSend = true;
                    },
                    error: (err) => {
                      this.successCreation = false;
                      this.store$.dispatch(new LoadingFinishAction());
                    },
                    complete: () => {
                      this.store$.dispatch(new LoadingFinishAction());
                    },
                  });

                });
              },
              error: (err) => {
                    this.successCreation = false;
                    this.store$.dispatch(new LoadingFinishAction());
              },
              complete: () => {
                this.store$.dispatch(new LoadingFinishAction());
              },
            });
          });
        },
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getUserData() {
    this.userService.getUserData().subscribe({
      next: (user: IUser) => {
        this.userId = user._id;
      },
      error: (err) => {
        this.openSnackBar(
          'Sorry something went wrong. Please try again later.',
          'ERROR'
        );
      },
      complete: () => {
        this.getProject(this.projectId);
      },
    });
  }

  getProject(id): void {
    this.projectService.getProject(id).subscribe({
      next: (project: IProject) => {
        this.projectInfo = project;
        this.projectAuthorId = project.created_by;
      },
      error: (err) => {
        this.openSnackBar(
          'Sorry something went wrong. Please try again later.',
          'ERROR'
        );
      },
      complete: () => {
        this.isUserProjectCreator = this.userId === this.projectAuthorId;
      },
    });
  }
}
