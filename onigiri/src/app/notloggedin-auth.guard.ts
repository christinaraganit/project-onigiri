import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotloggedinAuthGuard implements CanActivate {

  constructor (
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.auth.loggedIn()) {
        this.router.navigate(['/login']);
      }
      return true;
  }
  
}
