import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { ITeam } from 'src/app/models/team';
import { ChatService } from 'src/app/services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-assessment',
  templateUrl: './chat-assessment.component.html',
  styleUrls: ['./chat-assessment.component.scss']
})
export class ChatAssessmentComponent implements OnInit {
  @Input() user: IUser;
  @Input() team: ITeam;
  mentor;
  assessmentForm;

  constructor(private chatService: ChatService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mentor = this.team.mentors.find(item => item.user_id === this.user._id);
    this.assessmentForm = this.formBuilder.group({
      comment: this.mentor.comment,
      mark: new FormControl(this.mentor.mark),
    });
  }

  sendAssessment(data) {
    if (data.mark) {
      this.chatService.patchMentorAssessment(this.team._id, this.user._id, data)
        .subscribe({
          next: res => {
            this.snackBar.open('Your feedback saved!', '✔', {
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
    } else {
      this.snackBar.open('Please choose a mark before saving', 'Close', {
        duration: 3000,
      });
    }
  }
}
