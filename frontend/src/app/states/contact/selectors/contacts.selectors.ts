import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
 
 
export const selectContactList = (state: AppState) => state.contactState.contacts;
export const selectselectedContact= (state: AppState) => state.contactState.selectedContact;
