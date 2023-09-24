import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IContactFull, NullDateStringOrDate } from 'src/app/interfaces/IContact';
import { AppState } from 'src/app/states/app.state';
import { ContactApiActions, ContactApiCrudDeleteActions } from 'src/app/states/contact/actions/contact.actions';
import { SELECTORS } from 'src/app/states/contact/selectors';
import { format } from 'date-fns';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-contact-detalle',
  templateUrl: './contact-detalle.component.html',
  styleUrls: ['./contact-detalle.component.scss'],
})
export class ContactDetalleComponent implements OnDestroy {
  items: MenuItem[] | undefined;

  public contact: IContactFull | null = null;
  constructor(private confirmationService: ConfirmationService, private activeRouter: ActivatedRoute, private store: Store<AppState>, private router: Router) { }
  ngOnDestroy(): void {
  }
  ngOnInit() {
    const contactId = Number(this.activeRouter.snapshot.paramMap.get('id'))
    this.store.dispatch(ContactApiActions.loadSelectedContact({ contactId }))
    this.store.select(SELECTORS.selectselectedContact).subscribe(data => {
      this.contact = data
    })
  }

  formatDate(inputDate: NullDateStringOrDate): string {
    if (!inputDate) return '';
    const date = new Date(inputDate);
    return format(date, 'dd/MM/yyyy hh:mm a');
  }

  onList() {
    this.store.dispatch(ContactApiActions.loadedSelectedResetContact())
    this.router.navigate(['/']);

  }
  confirmRemove() {
    const contactId = this.contact?.id
    if (contactId) {
      this.confirmationService.confirm({
        message: 'La eliminacion sera de forma permanente',
        header: '¿Desea eliminar el contacto?',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.onDeleteContact(contactId);
        },
      });
    }
  }
  private onDeleteContact(contactId: number) {
    this.store.dispatch(ContactApiCrudDeleteActions.loadDelete({ contactId }));
    this.store.dispatch(ContactApiActions.loadedSelectedResetContact())
    this.onList()
  }
  onDetail() {
    this.router.navigate(['contacts/edit', Number(this.contact?.id)]);
  }

}
