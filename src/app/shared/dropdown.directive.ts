import { Directive, ElementRef, HostBinding, HostListener} from '@angular/core'
@Directive({
    selector: '[appDropdown]'
})
    export class DropdownDirective {
        @HostBinding('class.open') isOpen = false;
        @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
        }
        constructor(private elRef: ElementRef) {}
  

    // export class DropdownDirective {
        
    //     @HostBinding('class.open') isOpen = false;

    //     @HostListener('click') buttonClick(){
    //         this.isOpen=!this.isOpen
    //     }


//     @HostListener('mouseenter') mouseover(eventData: Event) {
//         this.timeVariable = setInterval(():void => this.incrementAndEmit(), this.timeStamp);
//       }
    
//       @HostListener('mouseleave') mouseleave(eventData: Event) {
//         if(this.timeVariable != undefined){
//             clearInterval(this.timeVariable)
//           }
//       }


//     timeStamp = 1000

//   timeVariable : ReturnType<typeof setTimeout> | undefined
  
//   timeIncrementationVariable: number = 0
//   incrementAndEmit(){
//     this.timeIncrementationVariable+=1    
//     console.log(this.timeIncrementationVariable)      
//   }
  
}