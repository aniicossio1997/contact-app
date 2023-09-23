import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IContact } from 'src/app/interfaces/IContact';
import { AppState } from 'src/app/states/app.state';
import { ContactApiActions, ContactApiCrudDeleteActions } from 'src/app/states/contact/actions/contact.actions';
import { SELECTORS } from 'src/app/states/contact/selectors';
import { ConfirmationService} from 'primeng/api';
import {Observable,BehaviorSubject} from 'rxjs'
@Component({
  selector: 'pages-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],

})
export class ContactListComponent implements OnInit {
  public contacts:IContact[]=[]

  constructor(private store:Store<AppState>,private router: Router, private confirmationService: ConfirmationService){
  }
  ngOnInit(): void {
    this.store.select(SELECTORS.selectInitialLoaded).subscribe(initial=>{
      if(!initial){
        this.store.dispatch(ContactApiActions.loadContactList());
      }
    })
    this.store.select(SELECTORS.selectContactList).subscribe(data=>{
          this.contacts=data
    });
  }
  onDetail(contactId:number){
    this.router.navigate(['/contacts', contactId]);
  }
  confirmRemove(id:number) {
    this.confirmationService.confirm({
        message: 'La eliminacion sera de forma permanente',
        header: '¿Desea eliminar el contacto?',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.onDeleteContact(id);
        },
    });
  }
  onGoPageNew(){
    this.router.navigate(['/contacts/new']);
  }
  private onDeleteContact(contactId:number){
    this.store.dispatch(ContactApiCrudDeleteActions.loadDelete({contactId}));
  }
  get isContacts(){
    return this.contacts.length > 0;
  }
  onGoToEdit(contactId:number){
    this.router.navigate(['contacts/edit',contactId])
  }

}
