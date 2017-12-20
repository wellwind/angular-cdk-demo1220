import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnlineUser } from './online-user';
import { OnlineUsersService } from './online-users.service';
import { MatButton } from '@angular/material';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { InfoCardComponent, CHAT_USER_ID_TOKEN, CHAT_OVERLAY_REF } from './info-card/info-card.component';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  onlineUsers$: Observable<OnlineUser[]>;

  constructor(private onlineUsersService: OnlineUsersService, private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.onlineUsers$ = this.onlineUsersService.getOnlineUsers();
  }

  chat(origin: MatButton, user: OnlineUser) {}

  chatDialog(origin: MatButton, user: OnlineUser) {}
}
