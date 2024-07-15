import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

    constructor( private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): boolean {
        const userRole = localStorage.getItem("roleName");

        const requiredRoles = (route.data?.["requiredRoles"] as string[]) ?? [];
        
        console.log("User Role:", userRole);
        console.log("Required Roles:", requiredRoles);
        
        const hasRequiredRole = requiredRoles.some((role) => role === userRole);
        
        console.log("Has Required Role:", hasRequiredRole);
        
        if (hasRequiredRole) {  
          return true;
        } else {
          return false;
        }}
        
      
   /*  canActivate(): boolean {
        if (localStorage.getItem('userName') !== null  ) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    } */

}
