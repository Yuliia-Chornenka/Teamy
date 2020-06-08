import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {
  @Input() users: IUser[] = [];
  @Input() online: IUser[] = [];
  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
  }

  checkOnline(user) {
    return this.online.find(item => item._id === user._id);
  }

}
