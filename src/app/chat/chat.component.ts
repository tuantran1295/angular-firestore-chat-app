import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ChatService } from '../service/chat.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { Chat } from '../model/chat.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  allChats = [];
  currentChat;
  newMsg: string;


  constructor(
    public chatService: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    public userService: UserService
  ) {}

  ngOnInit() {
     this.chatService.getAllChats().subscribe(chats => {
       console.log(chats);
       this.allChats = chats;
        // set currentChat as first chat
       this.joinFirstChat();
       for (let i = 0; i < chats.length; i++) {
          const chat = chats[i] as Chat;
          this.userService.getUserProfile(chat.uid).subscribe(user => {
            this.allChats[i].author = user as User;
          });
        }
     });
  }

  joinFirstChat() {
    this.onChatRoomClick(this.allChats[0].id, 0);
  }

  onChatRoomClick(chatId, index) {
    const source = this.chatService.getChat(chatId);
    this.chatService.joinUsers(source).subscribe(chat => {
      this.currentChat = chat;
    });

    for (let i = 0; i < this.allChats.length; i++) {
      if (this.allChats[i].active) {
        this.allChats[i].active = false;
      }
    }
    this.allChats[index].active = true;
  }

  submit(chatId) {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.chatService.sendMessage(chatId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

}
