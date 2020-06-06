import { Component, OnInit, Input } from '@angular/core';
import { IProject } from 'src/app/models/project';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-info-header',
  templateUrl: './chat-info-header.component.html',
  styleUrls: ['./chat-info-header.component.scss']
})
export class ChatInfoHeaderComponent implements OnInit {
  @Input() project: IProject;

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }

}
