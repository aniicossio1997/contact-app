import { IContact, IContactFull } from "src/app/interfaces/IContact";

export interface contactState{
    isLoading:boolean,
    contacts: IContact[],
    selectedContact:IContactFull | null,
    statusCrud: EnumStatusCrud
}
export enum EnumStatusCrud {
    SUCCESS = 'success',
    ERROR = 'error',
    PENDING = 'pending',
    NONE = 'none',
  }
  