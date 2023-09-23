import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../interfaces/IResponse';
import { Observable, map, tap } from 'rxjs';
import { IContact, IContactForm, IContactFull } from '../interfaces/IContact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private API_URL = `${environment.API_URL}contacts`
  url='https://localhost:7251/api/contacts';
  constructor(private http:HttpClient) { }

  getAll():Observable<IContact[]>{
    return this.http.get<IResponse<IContact[]>>(`${this.url}`)
    .pipe(
      tap(data=> (data)),
      map(data=> data.data))
  }
  getFullById(contactId:number):Observable<IContactFull>{
    return this.http.get<IResponse<IContactFull>>(`${this.url}/${contactId}`)
    .pipe(
      tap(data=> (data)),
      map(data=> data.data))
  }
  addContact(newContact:IContactForm):Observable<IContact>{
    return this.http.post<IResponse<IContact>>(`${this.url}`,newContact)
    .pipe(
      map(data=> data.data))
  }
  deleteContact(contactId:number):Observable<number>{
    return this.http.delete<IResponse<any>>(`${this.url}/${contactId}`)
    .pipe(
      tap(data=> console.log(data)),
      map(data=> contactId))
  }
  updateContact(contactId:number,updateContact:IContactForm):Observable<IContactFull>{
    return this.http.patch<IResponse<IContactFull>>(`${this.url}/${contactId}`,updateContact)
    .pipe(
      tap(data=> (data)),
      map(data=> data.data))
  }
}
