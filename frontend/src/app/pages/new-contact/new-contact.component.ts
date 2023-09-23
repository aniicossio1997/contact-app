import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IContactForm } from 'src/app/interfaces/IContact';
import { AppState } from 'src/app/states/app.state';
import { ContactApiCrudAddActions } from 'src/app/states/contact/actions/contact.actions';
import { SELECTORS } from 'src/app/states/contact/selectors';
import { EnumStatusCrud } from 'src/app/states/contact/interfaces/contact-state.interfaces';


@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent  {
  stateAdd:EnumStatusCrud=EnumStatusCrud.NONE;
  constructor(private store:Store<AppState>,private router: Router) {
  }


  public goToList() {
    this.router.navigate(['/']);
  }

  onFormSubmit(newContact:IContactForm) {
    // Aquí puedes manejar la lógica para guardar el nuevo contacto
    console.log('Datos del formulario:', newContact);
    this.store.dispatch(ContactApiCrudAddActions.loadAdd({newContact:newContact}));
    this.store.select(SELECTORS.selectStateCrud).subscribe(data=>{
      this.stateAdd=data.status;
      if(this.stateAdd=EnumStatusCrud.SUCCESS){
        this.goToList()
      }
    });

  }
  
}
