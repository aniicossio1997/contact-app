import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { ContactApiActions, ContactApiCrudActions } from '../actions/contact.actions';
import { ContactService } from 'src/app/services/contact.service';

@Injectable()
export class CrudContactEffects {
  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactApiCrudActions.loadAdd),
      exhaustMap(({ bodyContact }) =>
        this.contactService.addContact(bodyContact).pipe(
          tap(contact => console.log(contact)),
          map(contact => ContactApiCrudActions.loadedAddSucces()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  // Agrega la acción loadContactList después de agregar un nuevo contacto
  addContactSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactApiCrudActions.loadedAddSucces),
      mergeMap(() => [ContactApiActions.loadContactList()]) // Dispara la acción loadContactList
    )
  );
}
