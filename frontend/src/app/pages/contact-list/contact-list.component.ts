import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IContact } from 'src/app/interfaces/IContact';
import { AppState } from 'src/app/states/app.state';
import { ContactApiActions, ContactApiCrudDeleteActions } from 'src/app/states/contact/actions/contact.actions';
import { SELECTORS } from 'src/app/states/contact/selectors';
import { ConfirmationService, SortEvent } from 'primeng/api';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface ISortCustom extends SortEvent {
  data: IContactOrder[],
  field: string,
  mode: string,
  order: number
}
interface IContactOrder extends IContact {
  [key: string]: any; // Firma de índice que acepta cadenas como clave
}
@Component({
  selector: 'pages-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],

})
export class ContactListComponent implements OnInit {
  searchTerm: string = '';
  showClearButton: boolean = false;
  filteredContacts: IContact[] = [];
  isLoadingContacts:Boolean=true;

  constructor(private store: Store<AppState>, private router: Router, private confirmationService: ConfirmationService) {
  }
  ngOnInit(): void {
    this.store.select(SELECTORS.selectInitialLoaded).pipe(debounceTime(400)) 
    .subscribe(initial => {
      if (!initial) {
        this.store.dispatch(ContactApiActions.loadContactList());
      }
    })
  this.store.select(SELECTORS.selectIsLoadingList)
  .subscribe(data => this.isLoadingContacts = data);

  this.store.select(SELECTORS.selectFilteredContacts).subscribe(data => this.filteredContacts = data);
  this.store.select(SELECTORS.selectSearchTerm).subscribe(data=>this.searchTerm=data);
  }
  onDetail(contactId: number) {
    this.router.navigate(['/contacts', contactId]);
  }
  confirmRemove(id: number) {
    this.confirmationService.confirm({
      message: 'La eliminacion sera de forma permanente',
      header: '¿Desea eliminar el contacto?',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.onDeleteContact(id);
      },
    });
  }
  onGoPageNew() {
    this.router.navigate(['/contacts/new']);
  }
  private onDeleteContact(contactId: number) {
    this.store.dispatch(ContactApiCrudDeleteActions.loadDelete({ contactId }));
  }
  get isContacts() {
    return this.filteredContacts.length > 0;
  }
  onGoToEdit(contactId: number) {
    this.router.navigate(['contacts/edit', contactId])
  }
  customSort(event: ISortCustom) {
    const property = event.field;
    this.filteredContacts = event.data.slice().sort((data1: IContactOrder, data2: IContactOrder) => {
      const value1 = data1[property];
      const value2 = data2[property];
      if (property === 'phone') {
        // Si la propiedad es "phone", extraer los dígitos numéricos
        const numericValue1 = Number(value1.replace(/\D/g, ''));
        const numericValue2 = Number(value2.replace(/\D/g, ''));
        return (event.order || 1) * (numericValue1 - numericValue2);
      }
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }
  onSearchChange() {
    // Enviamos el término de búsqueda al observable searchTerm$
    this.searchTerm=this.searchTerm.trim();
    if (this.searchTerm.length > 0) {
      this.showClearButton = true;
      this.filter(this.searchTerm);
     
    } else {
      this.showClearButton = false;
      this.store.dispatch(ContactApiActions.searchContactReset());
    }
  }

  clearSearch() {
    this.showClearButton = false;
    this.store.dispatch(ContactApiActions.searchContactReset());
    // Restaura la lista de contactos original o realiza alguna acción para quitar el filtro
  }
  private filter(searchTerm: string) {
    this.store.dispatch(ContactApiActions.searchContact({searchTerm}))
  }
  get isStatusSearch(){
    return this.searchTerm.length >0
  }

}
