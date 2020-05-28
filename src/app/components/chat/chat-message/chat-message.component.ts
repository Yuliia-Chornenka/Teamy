import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../../Services/chat.service';
import { IMessage } from '../../../Models/message';
import { IUser } from '../../../Models/user.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: IMessage;
  @Input() user: IUser;
  messageDate;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.messageDate = this.chatService.convertToDate(this.message.date);
  }

}
