import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {

   constructor(private router: Router) {}

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | UrlTree {
      
      let url: string = state.url;
      let val: string | null = localStorage.getItem('isUserLoggedIn');

      if (val != null && val === "true") {
         if (url === "/login") {
            return this.router.createUrlTree(['/home']);
         } else {
            return true;
         }
      } else {
         return this.router.createUrlTree(['/login']);
      }
   }
}
