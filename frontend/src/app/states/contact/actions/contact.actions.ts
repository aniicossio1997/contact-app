import { createActionGroup, props } from '@ngrx/store';
import { IContact, IContactForm, IContactFull } from 'src/app/interfaces/IContact';


export const ContactApiActions = createActionGroup({
    source: 'Contact API',
    events: {
        'Load Contact List': props,
        'Loaded Contact List': props<{ contacts: IContact[] }>(),
        'Load selected contact': props<{ contactId: number }>(),
        'Loaded selected contact': props<{ selectedContact: IContactFull }>(),
        'Loaded selected Error contact': props,
        'Loaded selected Reset contact': props,
    }
});
export const ContactApiCrudAddActions = createActionGroup({
    source: 'Crud Add Contact',
    events: {
        'Load Add': props<{ newContact:IContactForm}>(),
        'Loaded Add Success':  props<{ newContact:IContact}>(),
        'Loaded Add Error': props,
    }
});
export const ContactApiCrudDeleteActions = createActionGroup({
    source: 'Crud Delete Contact',
    events: {
        'Load Delete': props<{contactId:number}>(),
        'Loaded Delete Success':  props<{ contactId:number}>(),
        'Loaded Delete Error': props,
    }
});
export const ContactApiCrudUpdateActions = createActionGroup({
    source: 'Crud Update Contact',
    events: {
        'Load Update': props<{contactId:number, contactForm:IContactForm}>(),
        'Loaded Update Success':  props<{ contact:IContactFull}>(),
        'Loaded Update Error': props,
    }
});
export const CrudStateActions = createActionGroup({
    source: 'Crud Reset State',
    events: {
        'Reset': props,
    }
});