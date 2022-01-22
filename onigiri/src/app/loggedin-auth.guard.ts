import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.loggedIn()) {
        this.router.navigate(['./dashboard']);
      }
      return true;
  }
  
}
