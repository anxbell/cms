import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {

  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();

    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }




//   onAddMessage(message: Message) {
//   this.messages.push(message);
// }

}


  // messages: Message[] = [
  //   new Message(
  //     '1', 
  //     'Hello! Grades posted', 
  //     'The grades for this assignment have been posted', 
  //     'Bro. Jackson'),
  //   new Message(
  //     '2', 
  //     'Due date', 
  //     'When is assignment 3 due?', 
  //     'Valerie Sanchez'),
  //   new Message(
  //     '3', 
  //     'Hello! Due date', 
  //     'Assignment 3 is due on Saturday at 11:30 PM', 
  //     'Bro. Jackson'),
  //     new Message(
  //       '4', 
  //       'Due date', 
  //       'Can I meet with you sometime. I need help with assignment 3', 
  //       'Karen Perdomo'),
  //     new Message(
  //     '5', 
  //       'Hello! Due date', 
  //       'I can meet with you today at 4:00 Pm in my office.', 
  //       'Bro. Jackson'),
  // ];