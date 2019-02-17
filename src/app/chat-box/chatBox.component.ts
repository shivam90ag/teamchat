import { Component, Input, Output } from '@angular/core';
import { ChatService } from '../chat.service';
import { EventEmitter } from '@angular/common/src/facade/async';

@Component({
  selector: 'chat-box',
  templateUrl: './chatBox.component.html',
  styleUrls: ['./chatBox.component.css']
})
export class ChatBoxComponent {
  tabs: Array<any> = [];
  @Input() activeTabUser: any;
  @Output() closeTabAction = new EventEmitter();
  activatedTabToken: any;
  text: any;
  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.chatService.socket.on('getText', (textObj: any) => {
      let user = this.chatService.users.find(obj => obj.token === textObj.from);
      if (user) {
        user['chatBox'] = user['chatBox'] || [];
        user.chatBox.push(textObj);
      }

    })

  }
  ngOnChanges() {
    this.deactivateAllTab();
    this.tabs = [...this.chatService.users,...this.chatService.groups]
    if (this.tabs && this.tabs.length && this.activeTabUser) {
      console.log("_______1",this.chatService.users)
      let obj = this.tabs.find(obj => obj.token === this.activeTabUser.token);
      console.log("_______2",obj)

      obj.isTabOpened = true;
      obj.isTabActive = true;
    }

  }
  closeTab(user: any, index: number) {
    this.closeTabAction.emit(true);
    user.isTabOpened = false;
    user.isTabActive = false;
    if (index > 0) {
      for (let i = index - 1; i >= 0; i--) {
        if (this.tabs[i].isTabOpened) {
          this.tabs[i].isTabActive = true;
          return
        }
      }
      for (let i = index - 1; i <= this.chatService.users.length; i++) {
        if (this.tabs[i].isTabOpened) {
          this.tabs[i].isTabActive = true;
          return
        }
      }
    }
  }
  deactivateAllTab() {
    if (this.tabs)
      for (let u of this.tabs) {
        u.isTabActive = false;
      }
  }
  selectTab(user: any) {
    console.log("=========>1")
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
