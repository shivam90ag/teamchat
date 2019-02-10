import { Component } from '@angular/core';

import '../assets/css/styles.css';
import { ChatService } from './chat.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private chatService:ChatService){}

 }
