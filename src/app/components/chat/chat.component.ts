import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import * as io from 'socket.io-client';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  chatForm;
  socket;
  messages = [];
  users = [];
  // TODO: room should be equal to project team ID
  room = 1;
  // TODO: user should be equal to auth token?
  user = `User${Math.round(Math.random() * 99999)}`;

  constructor(private formBuilder: FormBuilder) {
    this.socket = io.connect();

    this.socket.on('connect', () => {
      this.socket.emit('connect room', {
        room: this.room,
        user: this.user,
      });
    });

    this.socket.on('user disconnected', (data) => {
      this.users = data;
    });

    this.socket.on('user connected', (data) => {
      this.users = data;
    });

    this.socket.on('message', (data) => {
      this.messages.push(data);
    });

    this.chatForm = this.formBuilder.group({
      text: '',
    });
  }

  ngOnInit(): void {
    this.scrollChat();
  }

  ngAfterViewChecked(): void {
    this.scrollChat();
  }

  sendMessage({ text }): void {
    if (this.chatForm.valid) {
      this.socket.emit('message', {
        room: this.room,
        text,
        user: this.user,
        date: Date.now(),
      });
      this.chatForm.reset();
    }
  }

  scrollChat(): void {
    const mainDiv = (document.querySelector('.messages__main') as HTMLElement);
    mainDiv.scrollTop = mainDiv.scrollHeight;
  }
}
