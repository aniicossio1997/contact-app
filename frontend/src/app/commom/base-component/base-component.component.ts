import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './base-component.component.html'
})
export class BaseComponentComponent {
  constructor(private router: Router) {}

  public goToList() {
    this.router.navigate(['/']);
  }
}
