import { Permission } from './auth.model';
import { Directive, effect, inject, input } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias:'appAuth'});
  authService = inject(AuthService)

  
  constructor() {
    // using effect to react to signal changes as it creates subscriptinos to them 
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        console.log('SHOW ELEMENT');
      } else {
        console.log('DO NOT SHOW ELEMENT')
      }
    })
  }

}
