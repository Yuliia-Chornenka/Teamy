import { Component, OnInit, Input } from '@angular/core';
import { IChatMessage, ChatService } from '../../../Services/chat.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: IChatMessage;
  @Input() user;
  messageDate;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.messageDate = this.chatService.convertToDate(this.message.date);
  }

}