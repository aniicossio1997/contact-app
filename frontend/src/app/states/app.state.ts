import { ActionReducerMap } from "@ngrx/store";
import { contactState } from "./contact/interfaces/contact-state.interfaces";
import { contactsReducer } from "./contact/reducers/contacts.reducer";
export interface AppState{
    contactState: contactState;
  }
export const ROOT_REDUCERS:ActionReducerMap<AppState>={
    contactState: contactsReducer
}
