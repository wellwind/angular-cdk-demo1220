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

  chat(origin: MatButton, user: OnlineUser) {
    const strategy = this.overlay
      .position()
      .connectedTo(origin._elementRef, { originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
      // 備用方案
      .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' });

    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop', // 沒有設這個的話, 會有一個灰色背景檔在後面
      positionStrategy: strategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition() // scroll後會重新定位
      // noop: 不做任何事情(預設), close: 關閉, block: 禁止捲動, reposition: 重新定位
    });
    const overlayRef = this.overlay.create(config);

    overlayRef.attach(new ComponentPortal(InfoCardComponent, this.viewContainerRef, this._createInjector(overlayRef, user.id)));
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

  private _createInjector(overlayRef: OverlayRef, id: number) {
    const customTokens = new WeakMap<any, any>();
    customTokens.set(CHAT_OVERLAY_REF, overlayRef);
    customTokens.set(CHAT_USER_ID_TOKEN, id);
    return new PortalInjector(this.viewContainerRef.injector, customTokens);
  }

  chatDialog(origin: MatButton, user: OnlineUser) {
    const strategy = this.overlay
      .position()
      .global()
      // .top('100px')
      // .left('200px')
      .centerHorizontally()
      .centerVertically()
      .width('500px')
      .height('500px');

    const config = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: strategy,
      scrollStrategy: this.overlay.scrollStrategies.block() // 關掉捲軸
    });
    const overlayRef = this.overlay.create(config);

    overlayRef.attach(new ComponentPortal(InfoCardComponent, this.viewContainerRef, this._createInjector(overlayRef, user.id)));
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}
