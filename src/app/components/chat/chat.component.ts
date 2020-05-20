import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatForm;
  socket;
  messages = [];
  // TODO: room should be equal to project team ID
  room = 1;
  // TODO: user should be equal to auth token?
  user = `User${Math.round(Math.random() * 99999)}`;

  constructor(private formBuilder: FormBuilder) {
    this.socket = io.connect();

    this.socket.on('connect', () => {
      this.socket.emit('room', {
        room: this.room,
        user: this.user,
      });
    });

    this.socket.on('message', (data) => {
      console.log(data);
      this.messages.push(data);
    });

    this.chatForm = this.formBuilder.group({
      text: '',
    });
  }

  ngOnInit(): void {
  }

  sendMessage({ text }) {
    this.socket.emit('message', {
      room: this.room,
      text,
      user: this.user,
    });
    this.chatForm.reset();
  }
}
