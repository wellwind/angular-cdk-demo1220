import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnlineUser } from './online-user';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class OnlineUsersService {
  constructor() {}

  getOnlineUsers(): Observable<OnlineUser[]> {
    return Observable.of([
      {
        id: 1,
        name: '志玲',
        message: '別再起來了！萌萌！！',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Lin_Chi-Ling_%28cropped%29.jpg/749px-Lin_Chi-Ling_%28cropped%29.jpg'
      },
      {
        id: 2,
        name: '依晨',
        message: '李大仁，我可能不愛你了',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/8/84/2008TIBE_Day4_Hall1_Cit%C3%A9Group_TheyKissAgain_SigningEvent_Ariel_Yi-cheng_Lin.jpg'
      },
      {
        id: 3,
        name: '妍希',
        message: '大笨蛋~~~',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Michelle_Chen.jpg'
      }
    ]);
  }

  getUserById(id): Observable<OnlineUser> {
    return this.getOnlineUsers().map(users => users.filter(user => user.id === id)[0]);
  }
}
