import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
 
 
export const selectContactList = (state: AppState) => state.contactState.contacts;
export const selectIsLoadingList = (state: AppState) => state.contactState.isLoading;
export const selectselectedContact= (state: AppState) => state.contactState.selectedContact;
export const selectStateCrud= (state: AppState) => state.contactState.statusCrud;
export const selectInitialLoaded= (state: AppState) => state.contactState.initialLoaded;
export const selectSearchTerm= (state: AppState) => state.contactState.searchTerm;
export const selectFilteredContacts= (state: AppState) => state.contactState.filteredContacts;
