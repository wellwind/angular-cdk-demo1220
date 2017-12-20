import { Component, OnInit, Input, InjectionToken, Inject } from '@angular/core';
import { OnlineUsersService } from '../online-users.service';
import { OnlineUser } from '../online-user';
import { Observable } from 'rxjs/Observable';
import { OverlayRef } from '@angular/cdk/overlay';

export const CHAT_OVERLAY_REF = new InjectionToken<OverlayRef>('chat_overlay_ref');
export const CHAT_USER_ID_TOKEN = new InjectionToken<number>('chat_user_id');

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {
  profile$: Observable<OnlineUser>;
  constructor(
    private onlineUserService: OnlineUsersService,
    @Inject(CHAT_OVERLAY_REF) private overlayRef: OverlayRef,
    @Inject(CHAT_USER_ID_TOKEN) private chatUserId: any
  ) {}

  ngOnInit() {
    this.profile$ = this.onlineUserService.getUserById(this.chatUserId);
  }

  close() {
    console.log(this.overlayRef);
    this.overlayRef.detach();
  }
}
