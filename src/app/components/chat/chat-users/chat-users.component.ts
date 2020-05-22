import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {
  @Input() users;

  constructor() { }

  ngOnInit(): void {
  }

}
