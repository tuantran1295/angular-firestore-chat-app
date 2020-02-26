import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private route: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      console.log(user);
      if (user) {
        this.route.navigate(['/chats']);
      }
    });
  }

}
