import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutFormComponent } from './checkoutform.component';
import { CheckoutFormRoutingModule } from './checkoutform-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        CommonModule,
        CheckoutFormRoutingModule,
        FormsModule,
        CheckboxModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        RippleModule
    ],
    declarations: [CheckoutFormComponent]
})
export class CheckoutFormModule { }
