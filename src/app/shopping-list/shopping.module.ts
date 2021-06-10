import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,    
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule.forChild([
            { path:'', component: ShoppingListComponent },
            //{ path: '**', redirectTo: '/shopping-list'}
     ]),
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