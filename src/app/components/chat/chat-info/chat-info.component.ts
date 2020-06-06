import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IProject } from 'src/app/models/project';
import { ChatService } from '../../../services/chat.service';
import { ITeam } from 'src/app/models/team';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit, OnChanges {
  @Input() project: IProject;
  @Input() team: ITeam;
  @Input() online: IUser[] = [];
  @Input() users: IUser[] = [];
  deadlineDate: string;
  projectLink: string;
  teamName = '';

  constructor(public chatService: ChatService,
              private snackBar: MatSnackBar) { }

  ngOnChanges(): void {
    this.setTeamName();
  }

  ngOnInit(): void {
  }

  saveTeamName(ev) {
    const name = ev.target.value;
    if (name) {
      this.chatService.patchTeamName(this.team._id, name)
        .subscribe({
          error: (res) => {
            console.error(res);
            this.snackBar.open('Sorry, something went wrong', 'Close', {
              duration: 3000,
            });
          }
        });
    } else {
      this.setTeamName();
      this.snackBar.open('Team name cannot be empty', 'Close', {
        duration: 3000,
      });
    }
  }

  setTeamName() {
    if (this.team && this.team.name) {
      this.teamName = this.team.name;
    }
  }

}
