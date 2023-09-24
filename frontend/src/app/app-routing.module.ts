import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent, // Asigna el componente ContactListComponent a la ruta raíz
  },
  {
    path: 'contacts',
    loadChildren: () => import('./../app/pages/pages.module').then(m => m.PagesModule)
  },{
    path:'error',
    component:ErrorPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
