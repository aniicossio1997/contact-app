import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PrimeModule } from '../prime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ContactFormComponent,
        
  ],
  imports: [
    CommonModule,
    PrimeModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[    ContactFormComponent,
    ]
})
export class ComponentsModule { }
