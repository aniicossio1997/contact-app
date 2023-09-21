import { ActionReducerMap, combineReducers, createReducer, on } from '@ngrx/store';
import { EnumStatusCrud, contactState } from '../interfaces/contact-state.interfaces';
import { ContactApiActions, ContactApiCrudActions } from '../actions/contact.actions';
import { AppState } from '../../app.state';



export const initialState: contactState = {contacts:[],
     isLoading:false, selectedContact:null,statusCrud:EnumStatusCrud.NONE
    };

export const contactsReducer = createReducer(
    initialState,
    on(ContactApiActions.loadContactList, (state) => ({...state, isLoading:true})),
    on(ContactApiActions.loadedContactList, (state,{contacts}) => ({...state, contacts,isLoading:false})),
    on(ContactApiActions.loadSelectedContact,  (state,{contactId})=>({...state})),
    on(ContactApiActions.loadedSelectedContact,(state,{selectedContact})=> ({...state,selectedContact})),
    //--------add contact
    on(ContactApiCrudActions.loadAdd, (state,{bodyContact}) => ({...state})),
    on(ContactApiCrudActions.loadedAddSucces, (state) => ({...state, statusCrud:EnumStatusCrud.SUCCESS})),
    on(ContactApiCrudActions.loadedAddError, (state) => ({...state, statusCrud:EnumStatusCrud.ERROR})),

)



  
  