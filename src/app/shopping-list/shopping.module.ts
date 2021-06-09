import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DropdownDirective } from "../shared/dropdown.directive";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,    
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule.forChild([{ path:'shopping-list', component: ShoppingListComponent } ]),
        //CommonModule, //instead BrowserModule 
        FormsModule,
        ReactiveFormsModule,
        SharedModule               
    ],
    
    // exports: [
    //     ShoppingListComponent,    
    //     ShoppingEditComponent,
    //]
})
export class ShoppingModule {}