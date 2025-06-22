import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;
  url: string = 'https://the-cms-project-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.getMessages();
    this.maxMessageId = this.getMaxId();
  }

  getMessages() {
    this.http
      .get<Message[]>(this.url)
      .subscribe(
        (documents: Message[]) => {
          this.messages = documents;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getMessage(id: string): Message | null {
    return this.messages.find(msg => msg.id === id) || null;
  }

  addMessage(message: Message): void {
    if (!message) return;

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }
  
    storeMessages() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(this.url, JSON.stringify(this.messages), { headers })
      .subscribe(() => {
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }


  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

}

