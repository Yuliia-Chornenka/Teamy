import { Component, OnInit, Input } from '@angular/core';
import { ILinkApi } from 'src/app/models/team';

@Component({
  selector: 'app-chat-link',
  templateUrl: './chat-link.component.html',
  styleUrls: ['./chat-link.component.scss']
})
export class ChatLinkComponent implements OnInit {
  @Input() link: string;
  @Input() linkApi: ILinkApi;

  constructor() { }

  ngOnInit(): void {
  }

}
