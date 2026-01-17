import { Permission } from './auth.model';
import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias:'appAuth'});
  private authService = inject(AuthService);
  // access to the content of a template
  private templateRef = inject(TemplateRef);
  // access to the place in the DOM where the directive is being used
  private viewContainerRef = inject(ViewContainerRef);

  
  constructor() {
    // using effect to react to signal changes as it creates subscriptinos to them 
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    })
  }

}
