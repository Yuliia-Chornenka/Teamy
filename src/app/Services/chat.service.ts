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
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const mins = date.getMinutes();

    return `${day > 9 ? day : '0' + day}.${month}.${year} ${hours > 9 ? hours : '0' + hours }:${mins > 9 ? mins : '0' + mins}`;
  }
}
