import { createActionGroup, props } from '@ngrx/store';
import { IContact, IContactForm, IContactFull } from 'src/app/interfaces/IContact';


export const ContactApiActions = createActionGroup({
    source: 'Contact API',
    events: {
        'Load Contact List': props,
        'Loaded Contact List': props<{ contacts: IContact[] }>(),
        'Load selected contact': props<{ contactId: number }>(),
        'Loaded selected contact': props<{ selectedContact: IContactFull }>(),
    }
});
export const ContactApiCrudActions = createActionGroup({
    source: 'Crud Add Contact',
    events: {
        'Load Add': props<{ bodyContact:IContactForm}>(),
        'Loaded Add Succes': props,
        'Loaded Add Error': props,
    }
});