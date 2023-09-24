import { IContact, IContactFull } from "src/app/interfaces/IContact";

export interface IContactState{
    isLoading:boolean,
    contacts: IContact[],
    filteredContacts:IContact[],
    selectedContact:IContactFull | null,
    statusCrud:IStatusCud,
    initialLoaded:boolean,
    searchTerm:string
}
export interface IStatusCud{
    status:EnumStatusCrud,
    description:string;
}

export enum EnumStatusCrud {
    SUCCESS = 'success',
    ERROR = 'error',
    PENDING = 'pending',
    NONE = 'none',
}
