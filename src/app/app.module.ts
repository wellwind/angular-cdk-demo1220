import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from './shared-material/shared-material.module';
import { AppComponent } from './app.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { OnlineUsersService } from './online-users.service';

@NgModule({
  declarations: [AppComponent, InfoCardComponent],
  imports: [BrowserModule, SharedMaterialModule, BrowserAnimationsModule],
  providers: [OnlineUsersService],
  bootstrap: [AppComponent],
  entryComponents: [InfoCardComponent]
})
export class AppModule {}
