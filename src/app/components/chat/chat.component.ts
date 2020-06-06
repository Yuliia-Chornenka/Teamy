import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import * as io from 'socket.io-client';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from '../../models/user.model';
import { IMessage } from '../../models/message';
import { ITeamRes } from '../../models/team-res';
import { IProject } from '../../models/project';
import { ChatService } from '../../services/chat.service';
import { ProjectService } from '../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.scss' ]
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('formRef') formRef;

  chatForm;
  socket;
  messages: IMessage[] = [];
  groupedMessages: IMessage[] = [];
  users: IUser[] = [];
  room: string;
  user: IUser;
  project: IProject;
  onlineUsers: IUser[] = [];
  sideOpened = true;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private chatService: ChatService,
              private errorMessage: MatSnackBar,
              private projectService: ProjectService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      text: '',
    });

    this.initChat();
  }

  ngAfterViewChecked(): void {
    this.scrollChat();
  }

  sendMessage({text}): void {
    if (this.chatForm.valid) {
      const date = Date.now();

      this.socket.emit('message', {
        room: this.room,
        text,
        user: this.user,
        date,
      });
      this.chatForm.reset();

      this.chatService.patchMessage(this.room, {
        user_id: this.user._id,
        date,
        text,
      }).subscribe({
        error: (res) => {
          this.showError(res.error);
        },
      });
    }
  }

  showError(error) {
    this.errorMessage.open(error, '', {
      duration: 2000,
    });
  }

  submitForm() {
    this.formRef.ngSubmit.emit();
  }

  scrollChat(): void {
    const mainDiv = (document.querySelector('.messages__main') as HTMLElement);
    mainDiv.scrollTop = mainDiv.scrollHeight;
  }

  checkUser(users, user) {
    console.log('USERS', users);
    console.log('USER', user);
    if (!users.find(item => item._id === user._id)) {
      console.log('NO USER');
      return;
    }
    this.router.navigate(['/profile']);
  }

  initChat() {
    this.route.params.subscribe(params => {
      this.room = params.id;
    });

    this.chatService.getUser()
      .then((res: IUser) => this.user = res)
      .then(user => {
        this.initSocket();
        return user;
      })
      .then(user => this.initTeam(user));
  }

  initTeam(user) {
    this.chatService.getTeam(this.room)
      .then((res: ITeamRes) => {
        this.users = res.team.members.map(item => {
          return {
            _id: item.user_id,
            name: item.user_name,
            photo: item.user_photo,
          };
        });
        return res;
      })
      .then((res: ITeamRes) => {
        this.messages = res.team.history.map(item => {
          return {
            text: item.text,
            user: this.users.find(userItem => userItem._id === item.user_id),
            date: item.date,
          };
        });
        this.groupMessages();
        return res;
      })
      .then((res: ITeamRes) => {
        this.getProject(res.team.project_id);
        return res;
      })
      .then((res: ITeamRes) => this.checkUser(res.team.members, user));
  }

  initSocket() {
    this.socket = io.connect();
    this.socket.on('connect', () => {
      this.socket.emit('connect room', {
        room: this.room,
        user: this.user,
      });
    });

    this.socket.on('user disconnected', (data: IUser[]) => {
      this.onlineUsers = data;
    });

    this.socket.on('user connected', (data: IUser[]) => {
      this.onlineUsers = data;
    });

    this.socket.on('message', (data: IMessage) => {
      this.messages.push(data);
      this.groupMessages();
    });

    this.scrollChat();
  }

  groupMessages() {
    this.groupedMessages.length = 0;
    this.messages.map((message: IMessage, index: number, array: IMessage[]) => {
      if (index > 0) {
        const lastMessage = array[index - 1];
        if (lastMessage.user._id === message.user._id && (message.date - lastMessage.date) < 60 * 1000) {
          this.addToMessage(message.text);
        } else {
          this.pushMessage(Object.assign({}, message));
        }
      } else {
        this.pushMessage(Object.assign({}, message));
      }
    });
  }

  pushMessage(message: IMessage) {
    this.groupedMessages.push(message);
  }

  addToMessage(text: string) {
    const index = this.groupedMessages.length;
    this.groupedMessages[index - 1].text += `\r\n${text}`;
  }

  getProject(id) {
    this.projectService.getProject(id).subscribe((res: IProject) => {
      this.project = res;
    });
  }
}
