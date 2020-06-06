import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-chat-profile-pic',
  templateUrl: './chat-profile-pic.component.html',
  styleUrls: ['./chat-profile-pic.component.scss']
})
export class ChatProfilePicComponent implements OnInit {
  @Input() user: IUser;
  @Input() offset: boolean;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.user);
  }

}
