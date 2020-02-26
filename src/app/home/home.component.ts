import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userChats$;

  constructor(public auth: AuthService, public cs: ChatService) {
  }

  ngOnInit() {
    this.userChats$ = this.cs.getAllChats();
  }

}
