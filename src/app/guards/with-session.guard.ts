import { Injectable } from '@angular/core';
import { UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import firebase from 'firebase/app';

import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class WithSessionGuard implements CanLoad {

  constructor(public readonly authService: AuthService) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.verifySession().pipe(
      tap((user: firebase.User) => {
        if (user) {
          this.authService.goToTasks();
        }
      }),
      map((user: firebase.User) => user ? false : true)
    );
  }
}
