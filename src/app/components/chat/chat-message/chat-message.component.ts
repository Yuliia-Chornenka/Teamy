import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { IMessage } from '../../../models/message';
import { IUser } from '../../../models/user.model';

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
