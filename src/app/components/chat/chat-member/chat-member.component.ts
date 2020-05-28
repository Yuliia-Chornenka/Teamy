import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-member',
  templateUrl: './chat-member.component.html',
  styleUrls: ['./chat-member.component.scss']
})
export class ChatMemberComponent implements OnInit {
  @Input() userName: string;
  @Input() isOnline: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
