import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * This service is used to protect routes from unauthorized access.
 * It checks if the user has a valid token in the local storage.
 * If the token is not present, it redirects the user to the sign in page.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  /**
   * The constructor injects the router service.
   * @param route The router service.
   */
  constructor(private route: Router) { }

  /**
   * This method is called by the Angular router to check if the route can be activated.
   * It returns true if the user has a valid token, false otherwise.
   */
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) this.route.navigate(['/sign-in']);
    return !!token;
  }
}

