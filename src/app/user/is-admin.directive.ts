import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[fbcIsAdmin]'
})
export class IsAdminDirective {

  constructor(
    element : ElementRef,
  ) {
    // TODO: pull in a UserService and check if the current user is an admin
    // element.nativeElement.disabled = true;
   }

}
