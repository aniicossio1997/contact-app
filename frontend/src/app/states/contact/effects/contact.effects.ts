import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
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
    exhaustMap(() => this.contactService.getAll() 
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
        catchError(() => EMPTY)
      ))
    )
  );
}

