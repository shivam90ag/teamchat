import { Component, Input } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'chat-box',
  templateUrl: './chatBox.component.html',
  styleUrls: ['./chatBox.component.css']
})
export class ChatBoxComponent {
  openTabs: Array<any> = [];
  @Input() activeTabUser: any;
  activatedTabToken: any;
  text: any;
  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.chatService.socket.on('getText', (textObj: any) => {
      let user = this.chatService.users.find(obj => obj.token === textObj.from);
      console.log("----------", user, textObj)
      if (user) {
        user['chatBox'] = user['chatBox'] || [];
        user.chatBox.push(textObj);
      }

    })

  }
  ngOnChanges() {
    this.deactivateAllTab();
    if (this.chatService.users && this.chatService.users.length) {
      let obj = this.chatService.users.find(obj => obj.token === this.activeTabUser.token);
      obj.isTabOpened = true;
      obj.isTabActive = true;
    }

  }
  closeTab(user: any, index: number) {
    user.isTabOpened = false;
    user.isTabActive = false;
    if (index > 0) {
      for (let i = index - 1; i >= 0; i--) {
        if (this.chatService.users[i].isTabOpened) {
          this.chatService.users[i].isTabActive = true;
          return
        }
      }
      for (let i = index - 1; i <= this.chatService.users.length; i++) {
        if (this.chatService.users[i].isTabOpened) {
          this.chatService.users[i].isTabActive = true;
          return
        }
      }
    }
  }
  deactivateAllTab() {
    if (this.chatService.users)
      for (let u of this.chatService.users) {
        u.isTabActive = false;
      }
  }
  selectTab(user: any) {
    this.deactivateAllTab();
    user.isTabActive = true;
    user.isTabOpened = true;
  }
  sendText(user: any) {

    if (this.text && this.text.trim()) {
      let obj = {};
      obj['message'] = this.text;
      obj['from'] = localStorage.getItem("userToken") || '';
      obj['to'] = user.token
      user['chatBox'] = user['chatBox'] || [];
      user['chatBox'].push(obj)
      this.chatService.socket.emit('sendText', obj)
      this.text = '';
    }
  }
}
