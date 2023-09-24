import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { ContactApiActions, ContactApiCrudAddActions, ContactApiCrudDeleteActions, ContactApiCrudUpdateActions } from '../actions/contact.actions';
import { ContactService } from 'src/app/services/contact.service';
import { NavigationServiceService } from 'src/app/services/navigation-service.service';

@Injectable()
export class CrudContactEffects {
  constructor(private actions$: Actions, private contactService: ContactService, private navigationService:NavigationServiceService) {}

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactApiCrudAddActions.loadAdd),
      exhaustMap(({ newContact }) =>
        this.contactService.addContact(newContact).pipe(
          switchMap((newContact) => {
            this.navigationService.goToDetails(newContact.id);
            return of(ContactApiCrudAddActions.loadedAddSuccess({ newContact: newContact }));
          }),
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
      exhaustMap(({ contactForm, contactId }) =>
        this.contactService.updateContact(contactId, contactForm).pipe(
          switchMap((updatedContact) => {
            this.navigationService.goToDetails(updatedContact.id);
            return of(ContactApiCrudUpdateActions.loadedUpdateSuccess({ contact: updatedContact }));
          }),
          catchError((error) => of(ContactApiCrudUpdateActions.loadedUpdateError()))
        )
      )
    )
  );
}
