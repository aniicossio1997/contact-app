import { ActionReducerMap } from "@ngrx/store";
import { IContactState } from "./contact/interfaces/contact-state.interfaces";
import { contactsReducer } from "./contact/reducers/contacts.reducer";
export interface AppState{
    contactState: IContactState;
  }
export const ROOT_REDUCERS:ActionReducerMap<AppState>={
    contactState: contactsReducer
}
