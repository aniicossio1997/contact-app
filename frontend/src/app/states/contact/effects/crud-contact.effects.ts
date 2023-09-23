import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { ContactApiActions, ContactApiCrudAddActions, ContactApiCrudDeleteActions, ContactApiCrudUpdateActions } from '../actions/contact.actions';
import { ContactService } from 'src/app/services/contact.service';

@Injectable()
export class CrudContactEffects {
  constructor(private actions$: Actions, private contactService: ContactService) {}

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactApiCrudAddActions.loadAdd),
      exhaustMap(({ newContact }) =>
        this.contactService.addContact(newContact).pipe(
          map((contact) => ContactApiCrudAddActions.loadedAddSuccess({ newContact: contact })),
          catchError((error) => of(ContactApiCrudAddActions.loadedAddError)) // Usa 'of' para emitir la acción
        )
      )
    )
  );
  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactApiCrudDeleteActions.loadDelete),
      exhaustMap(({ contactId }) =>
        this.contactService.deleteContact(contactId).pipe(
          map((contact) => ContactApiCrudDeleteActions.loadedDeleteSuccess({contactId:contact })),
          catchError((error) => of(ContactApiCrudDeleteActions.loadedDeleteError())) 
        )
      )
    )
  );
  updateContact$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ContactApiCrudUpdateActions.loadUpdate),
    exhaustMap(({ contactForm,contactId }) =>
      this.contactService.updateContact(contactId,contactForm).pipe(
        map((contact) => ContactApiCrudUpdateActions.loadedUpdateSuccess({ contact })),
        catchError((error) => of(ContactApiCrudUpdateActions.loadedUpdateError)) // Usa 'of' para emitir la acción
      )
    )
  )
);
}
