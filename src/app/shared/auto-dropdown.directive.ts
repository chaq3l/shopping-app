import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appAutoDropdown]'
})
export class AutoDropdownDirective {
  @HostBinding('class.open') isOpen = false;
  constructor() { }

    @HostListener('mouseenter') mouseover() {
        this.isOpen = true;
      }
    
      @HostListener('mouseleave') mouseleave() {
        this.isOpen = false;
      }
 
}



