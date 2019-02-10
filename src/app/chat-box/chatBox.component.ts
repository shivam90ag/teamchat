import { Component, Input } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'chat-box',
  templateUrl: './chatBox.component.html',
  styleUrls: ['./chatBox.component.css']
})
export class ChatBoxComponent {
    openTabs:Array<any>=[];
    @Input() activeTabUser:any;
    activatedTabToken :any;
    constructor(public chatService: ChatService){}

    ngOnInit(){
      this.chatService.users

    }
    ngOnChanges(){
      console.log("----------",this.activeTabUser)
      if(this.chatService.users && this.chatService.users.length){
        let obj= this.chatService.users.find(obj=>obj.token===this.activeTabUser.token);
        obj.isTabOpened = true;
        obj.isTabActive = true;
      console.log("2----------",this.chatService.users)
      }
      if(this.activatedTabToken){
        let obj= this.chatService.users.find(obj=>obj.token===this.activatedTabToken);
        obj.isTabActive = false;
      }
      this.activatedTabToken = this.activeTabUser ? this.activeTabUser.token : '';

    }
    closeTab(user:any){
      user.isTabOpened=false;
      user.isTabActive=false;
    }
 }
