import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, delay, filter, of } from 'rxjs';
import { IContactForm, IContactFull } from 'src/app/interfaces/IContact';
import { AppState } from 'src/app/states/app.state';
import { ContactApiActions, ContactApiCrudUpdateActions } from 'src/app/states/contact/actions/contact.actions';
import { EnumStatusCrud } from 'src/app/states/contact/interfaces/contact-state.interfaces';
import { SELECTORS } from 'src/app/states/contact/selectors';
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit, OnDestroy {
  stateAdd:EnumStatusCrud=EnumStatusCrud.NONE;
  public contact:IContactFull| null=null;
  backButtonLabel=''
  contactId: number| null=null;
  constructor(private store:Store<AppState>,private router: Router,private activeRouter: ActivatedRoute,private location: Location) {
  }
  ngOnInit(): void {
    this.contactId = Number(this.activeRouter.snapshot.paramMap.get('id'))
    this.store.dispatch(ContactApiActions.loadSelectedContact({contactId:this.contactId}))
    this.store.select(SELECTORS.selectselectedContact).subscribe(data=>{
      this.contact=data;
    })       
  }
  onFormSubmit(updateContact:IContactForm) {
    this.store.dispatch(ContactApiCrudUpdateActions.loadUpdate({contactForm:updateContact,contactId:Number(this.contactId)}));

  }
  ngOnDestroy(): void {
    this.store.dispatch(ContactApiActions.loadedSelectedResetContact())
  }

}
