import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {
  constructor(private router: Router) {}

  goToList() {
    this.router.navigate(['/']);
  }
}
