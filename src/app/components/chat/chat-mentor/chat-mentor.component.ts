import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat-mentor',
  templateUrl: './chat-mentor.component.html',
  styleUrls: ['./chat-mentor.component.scss']
})
export class ChatMentorComponent implements OnInit {
  @Input() user: IUser;
  @Input() isOnline: boolean;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  showSuccessBar() {
    this.snackBar.open('Email copied', '✔', {
      duration: 2000,
    });
  }

}
