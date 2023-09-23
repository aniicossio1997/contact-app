import { IContact, IContactFull } from "src/app/interfaces/IContact";

export interface IContactState{
    isLoading:boolean,
    contacts: IContact[],
    selectedContact:IContactFull | null,
    statusCrud:IStatusCud,
    initialLoaded:boolean
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
