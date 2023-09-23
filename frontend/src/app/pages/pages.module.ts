import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/prime.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SharedModule } from '../shared/shared.module';
import { ContactDetalleComponent } from './contact-detalle/contact-detalle.component';
import { RouterModule, Routes } from '@angular/router';
import { NewContactComponent } from './new-contact/new-contact.component';
import { ReactiveFormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: '', component:ContactListComponent },
  { path: 'new', component: NewContactComponent },
  { path: ':id', component: ContactDetalleComponent },
];
@NgModule({
  declarations: [ContactListComponent,ContactDetalleComponent, NewContactComponent],

  imports: [
    CommonModule,
    PrimeModule,
    SharedModule,
    RouterModule.forChild(appRoutes),
    ReactiveFormsModule
  ],
  exports:[ContactListComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class PagesModule { }