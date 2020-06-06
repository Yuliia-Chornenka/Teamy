import { Component, OnInit, Input } from '@angular/core';
import { IProject } from 'src/app/models/project';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit {
  @Input() project: IProject;

  constructor() { }

  ngOnInit(): void {
  }

}
