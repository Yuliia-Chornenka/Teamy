import { Injectable } from '@angular/core';

export interface IChatMessage {
  text: string;
  user: string;
  date: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  convertToDate(timestamp): string {
    const date = new Date(timestamp);
    const months = Array.from({length: 12}, (a, b) => b + 1);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const mins = date.getMinutes();

    return `${day}.${month}.${year} ${hours}:${mins}`;
  }
}
