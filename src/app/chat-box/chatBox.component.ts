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
      this.deactivateAllTab();
      if(this.chatService.users && this.chatService.users.length){
        let obj= this.chatService.users.find(obj=>obj.token===this.activeTabUser.token);
        obj.isTabOpened = true;
        obj.isTabActive = true;
      console.log("2----------",this.chatService.users)
      }

    }
    closeTab(user:any, index:number){
      user.isTabOpened=false;
      user.isTabActive=false;
      if(index>0){
        console.log("1->",index)
        for(let i=index-1; i>=0; i--){
        console.log("2->",i)

          if(this.chatService.users[i].isTabOpened){
        console.log("3->",this.chatService.users[i])

            this.chatService.users[i].isTabActive =true;
            return
          }
          for(let i=index-1; i<=this.chatService.users.length; i++){
            console.log("2->",i)
    
              if(this.chatService.users[i].isTabOpened){
            console.log("3->",this.chatService.users[i])
    
                this.chatService.users[i].isTabActive =true;
                return
              }
            }
        }
      }
    }
    deactivateAllTab(){
      if(this.chatService.users)
      for(let u of this.chatService.users){
        u.isTabActive=false;
      }
    }
    selectTab(user:any){
      this.deactivateAllTab();
      console.log("---",user)
      console.log("---2",this.chatService.users)
      user.isTabActive = true;
      user.isTabOpened = true;
    }
 }
