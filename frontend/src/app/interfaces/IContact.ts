export interface IContact {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
}
export interface IContactFull {
    id:          number;
    firstName:   string;
    lastName:    string;
    email:       string;
    phone:       string;
    description: string;
    createdAt:  NullDateStringOrDate;
    updatedAt:   NullDateStringOrDate;
}
export type NullDateStringOrDate = string | null | undefined | Date;

export interface IContactForm  extends Partial<IContactFull> {}
