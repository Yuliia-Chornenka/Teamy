import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import * as io from 'socket.io-client';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../Models/user.model';
import { IMessage } from '../../Models/message';
import { ChatService } from '../../Services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('formRef') formRef;

  chatForm;
  socket;
  messages: IMessage[] = [];
  users: IUser[] = [];
  room: string;
  user: IUser;
  onlineUsers: IUser[] = [];
  sideOpened = true;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private chatService: ChatService,
              private errorMessage: MatSnackBar) { }

  ngOnInit(): void {
    this.initChat();
  }

  ngAfterViewChecked(): void {
    this.scrollChat();
  }

  sendMessage({ text }): void {
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

  initChat() {
    this.route.params.subscribe(params => {
      this.room = params.id;
    });

    this.chatService.getUser()
      .then(res => this.user = res)
      .then(user => this.initSocket());

    this.chatService.getTeam(this.room)
      .then(res => {
        this.users = res['team'].members.map(item => {
          return {
            _id: item.user_id,
            name: item.user_name,
            photo: item.user_photo,
          };
        });
        return res;
      })
      .then(res => {
        this.messages = res['team'].history.map(item => {
          return {
            text: item.text,
            user: this.users.find(userItem => userItem._id === item.user_id),
            date: item.date,
          };
        });
      });
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
    });

    this.chatForm = this.formBuilder.group({
      text: '',
    });

    this.scrollChat();
  }
}
