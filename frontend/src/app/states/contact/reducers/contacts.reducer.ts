import { ActionReducerMap, combineReducers, createReducer, on } from '@ngrx/store';
import { EnumStatusCrud, IContactState } from '../interfaces/contact-state.interfaces';
import { ContactApiActions, ContactApiCrudAddActions, ContactApiCrudDeleteActions, ContactApiCrudUpdateActions, CrudStateActions } from '../actions/contact.actions';
import { AppState } from '../../app.state';
import { IContact, IContactFull } from 'src/app/interfaces/IContact';



export const initialState: IContactState = {
    contacts:[],
     isLoading:false, selectedContact:null,
     statusCrud:{description:'',status:EnumStatusCrud.NONE},
     initialLoaded:false,

    };

export const contactsReducer = createReducer(
    initialState,
    on(ContactApiActions.loadContactList, (state) => ({...state, isLoading:true})),
    on(ContactApiActions.loadedContactList, (state,{contacts}) => ({...state, contacts,isLoading:false,initialLoaded:true})),
    //----select
    on(ContactApiActions.loadSelectedContact,  (state,{contactId})=>({...state})),
    on(ContactApiActions.loadedSelectedContact,(state,{selectedContact})=> ({...state,selectedContact})),
    on(ContactApiActions.loadedSelectedErrorContact,(state)=> ({...state,statusCrud:{description:'No se encontro el contacto', status:EnumStatusCrud.ERROR}})),
    on(ContactApiActions.loadedSelectedResetContact,  (state)=>({...state,selectedContact:null})),
    //--------Reset Operation
    on(CrudStateActions.reset, (state) => ({...state, statusCrud:{description:'',status:EnumStatusCrud.NONE}})),
    // ------------Add Contact
    on(ContactApiCrudAddActions.loadAdd, (state,{newContact}) => ({...state})),
    on(ContactApiCrudAddActions.loadedAddSuccess, (state, { newContact }) => {
        const updatedContacts =[newContact, ...state.contacts];
        console.log('agregando',updatedContacts)
        return {
          ...state,
          contacts: updatedContacts,
          statusCrud:{description:'Se creo el contacto exitosamente',status:EnumStatusCrud.SUCCESS}
        };
      }),
    on(ContactApiCrudAddActions.loadedAddError, (state) => ({...state, statusCrud:{description:'Lo sentimos, No se pudo crear el contaco',status:EnumStatusCrud.ERROR}})),
    //------------Delete
    on(ContactApiCrudDeleteActions.loadDelete, (state,{contactId}) => ({...state})),
    on(ContactApiCrudDeleteActions.loadedDeleteSuccess, (state, { contactId }) => {
        const updatedContacts = state.contacts.filter(contact => contact.id !== contactId);
        return {
          ...state,
          contacts: updatedContacts,
          statusCrud: {description:'Se elimino el contacto correctamente',status:EnumStatusCrud.SUCCESS}
        };
      }),
    on(ContactApiCrudDeleteActions.loadedDeleteError, (state) => ({...state, statusCrud:{description:'Hubo un error al eliminar intente más tarde',status:EnumStatusCrud.ERROR}})),
    //------------update
    on(ContactApiCrudUpdateActions.loadUpdate, (state,{contactId,contactForm}) => ({...state})),
    on(ContactApiCrudUpdateActions.loadedUpdateSuccess, (state, { contact }) => {
        console.log(contact);
        let contactUpdateAuxFull:IContactFull | null=null;
        let contactUpdateAux:IContact =contact as IContact;
        const updatedContacts =state.contacts.map(contactPrev => contactPrev.id == contact.id ? contactUpdateAux : contactPrev );
        if(state.selectedContact){
          contactUpdateAuxFull=contact;
        }
        return {
          ...state,
          contacts: updatedContacts,
          selectedContact:contactUpdateAuxFull,
          statusCrud: {description:'Se actualizo el contacto correctamente',status:EnumStatusCrud.SUCCESS}
        };
      }),
    on(ContactApiCrudUpdateActions.loadedUpdateError, (state) => ({...state, statusCrud:{description:'Hubo un error al actualizar, intente más tarde',status:EnumStatusCrud.ERROR}})),
)



  
  