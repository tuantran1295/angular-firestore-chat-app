import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
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
  allChats = new Array<Chat>();
  currentChat$: Observable<any>;
  newMsg: string;
  currentchat$;

  constructor(
    public chatService: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    public userService: UserService
  ) {}

  ngOnInit() {
     this.chatService.getAllChats().subscribe(chats => {
        this.allChats = chats as Chat[];
        for (let i = 0; i < chats.length; i++) {
          let chat = chats[i] as Chat;
          this.userService.getUserProfile(chat.uid).subscribe(user => {
            this.allChats[i].author = user as User;
          });
        }
     });
  }

  onChatRoomClick(chatId) {
    const source = this.chatService.getChat(chatId);
    this.currentchat$ = this.chatService.joinUsers(source);
  }

  submit(chatId) {
    this.chatService.sendMessage(chatId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

}
