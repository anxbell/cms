import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    {
        id: 1,
        name: 'ITM 111 - Introduction to Databases',
        description: 'Learn how to design and manage relational databases.',
        url: 'https://example.com/itm111-intro-to-databases.pdf',
        children: []
    },
    {
        id: 2,
        name: 'WDD 330 - Web Frontend Development II',
        description: 'Explore advanced frontend development topics using HTML, CSS, and JavaScript.',
        url: 'https://example.com/wdd330-frontend-dev2.pdf',
        children: []
    },
    {
        id: 3,
        name: 'CSE 340 - Web Backend Development',
        description: 'Understand backend programming and database interaction for web apps.',
        url: 'https://example.com/cse340-backend-dev.pdf',
        children: []
    },
    {
        id: 4,
        name: 'CSE 341 - Web Services',
        description: 'Learn how to build and consume web services including RESTful APIs.',
        url: 'https://example.com/cse341-web-services.pdf',
        children: []
    },
    {
        id: 5,
        name: 'WDD 430 - Web Full-Stack Development',
        description: 'Master full-stack development integrating frontend and backend technologies.',
        url: 'https://example.com/wdd430-full-stack-dev.pdf',
        children: []
    }
  ];

  onSelectDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}