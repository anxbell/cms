import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice(); // return a copy
  }

  getDocument(id: string): Document | null {
    return this.documents.find(doc => doc.id === id) || null;
  }
}


// @Injectable({
//   providedIn: 'root'
// })
// export class DocumentService {

//   documentSelectedEvent = new EventEmitter<Document>();

//   documents: Document[] = [];

//   constructor() {
//     this.documents = MOCKDOCUMENTS;
//   }

//   getDocuments(): Document[] {
//     return this.documents.slice(); // return a copy
//   }

//   // getDocument(id: string): Document | null {
//   //   return this.documents.find(doc => doc.id === id) || null;
//   // }

//   getDocument(id: string): Document {
//     for (let document of this.documents) {
//       if (document.id === id) {
//         return document;
//       }
//     }
//     return null;
//   }  
// }

