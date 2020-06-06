import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-chat-member',
  templateUrl: './chat-member.component.html',
  styleUrls: ['./chat-member.component.scss']
})
export class ChatMemberComponent implements OnInit {
  @Input() user: IUser;
  @Input() isOnline: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
