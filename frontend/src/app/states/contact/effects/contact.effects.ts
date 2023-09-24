import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { ContactApiActions } from '../actions/contact.actions';
import { ContactService } from 'src/app/services/contact.service';

 
@Injectable()
export class ContactEffects {
  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
  loadContactList$ = createEffect(() => this.actions$.pipe(
    ofType(ContactApiActions.loadContactList),
    switchMap(() => this.contactService.getAll() 
      .pipe( 
        map(contacts => (ContactApiActions.loadedContactList({contacts}))),
        catchError(() => EMPTY)
      ))
    )
  );
  loadselectedContact$ = createEffect(() => this.actions$.pipe(
    ofType(ContactApiActions.loadSelectedContact),
    exhaustMap(({contactId}) => this.contactService.getFullById(contactId) 
      .pipe( 
        map(contact => (ContactApiActions.loadedSelectedContact({selectedContact:contact}))),
        catchError((error) => of(ContactApiActions.loadedSelectedErrorContact())) 
      ))
    )
  );
}

