import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { ITeam } from 'src/app/models/team';
import { ChatService } from 'src/app/services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat-assessment',
  templateUrl: './chat-assessment.component.html',
  styleUrls: ['./chat-assessment.component.scss']
})
export class ChatAssessmentComponent implements OnInit {
  @Input() user: IUser;
  @Input() team: ITeam;
  mentor;

  constructor(private chatService: ChatService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.mentor = this.team.mentors.find(item => item.user_id === this.user._id);
  }

  sendRating(rating) {
    this.chatService.patchMentorRating(this.team._id, this.user._id, rating)
      .subscribe({
        next: res => {
          this.snackBar.open('Your rating saved!', '✔', {
            duration: 3000,
          });
        },
        error: res => {
          console.error(res);
          this.snackBar.open('Sorry, something went wrong', 'Close', {
            duration: 3000,
          });
        },
      });
  }

  sendComment(ev) {
    this.chatService.patchMentorComment(this.team._id, this.user._id, ev.target.value.trim())
      .subscribe({
        next: res => {
          this.snackBar.open('Your comment saved!', '✔', {
            duration: 3000,
          });
        },
        error: res => {
          console.error(res);
          this.snackBar.open('Sorry, something went wrong', 'Close', {
            duration: 3000,
          });
        },
      });
  }
}
