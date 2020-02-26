import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate  {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }
  canActivate(next, state): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1), map(user => !!user), tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/']);
        }
      })
    );
  }


}
