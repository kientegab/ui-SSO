import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router : Router,
    private accountService: AuthenticationService,
  ) { 

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{    
    const authorities = route.data['authorities'];
    //const isMonCompte = route.data['isMonCompte'];  
    return this.checkLogin(authorities, state.url);
    
    // if (this.guardService.isLoggedIn()) { 
    //     return true;      
    // }      
    // navigate to login page as user is not authenticated      
    // this.router.navigate(['/login']);      
    // return false;      
  } 
  
  checkLogin(authorities: string[], url: string): Observable<boolean> {
    this.accountService.storeUrl(url);
    return this.accountService.identity().pipe(
      map(account => {
        if (!authorities || authorities.length === 0) {
          if (account) {
            this.accountService.storeUrl("/admin");
            this.router.navigate(['admin']);
            return false;
          }
          return true;
        }

        if (account) {
            const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
            if (hasAnyAuthority) {
              return true;
            }
            if (isDevMode()) {
              console.error('User has not any of required authorities: ', authorities);
            }
            this.router.navigate(['accessdenied']);
            return false; 
          }

        if (!authorities || authorities.length === 0) {
          return true;
        }
        this.router.navigate(['auth/login']);
        return false;
      })
    );
  }
}
