import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IContactFull, NullDateStringOrDate } from 'src/app/interfaces/IContact';
import { AppState } from 'src/app/states/app.state';
import { ContactApiActions } from 'src/app/states/contact/actions/contact.actions';
import { SELECTORS } from 'src/app/states/contact/selectors';
import { format } from 'date-fns';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-detalle',
  templateUrl: './contact-detalle.component.html',
  styleUrls: ['./contact-detalle.component.scss'],
})
export class ContactDetalleComponent{
  items: MenuItem[] | undefined;

  public contact:IContactFull| null=null;
  constructor( private confirmationService: ConfirmationService, private messageService: MessageService,private activeRouter: ActivatedRoute,private store:Store<AppState>,private router: Router) { }
  ngOnInit() {
    this.initItems();
    const contactId = Number(this.activeRouter.snapshot.paramMap.get('id'))
    this.store.dispatch(ContactApiActions.loadSelectedContact({contactId}))
    this.store.select(SELECTORS.selectselectedContact).subscribe(data=>{
      this.contact=data
    })
  }

  formatDate(inputDate: NullDateStringOrDate): string {
    if (!inputDate) return '';
    const date = new Date(inputDate);
    return format(date, 'dd/MM/yyyy hh:mm a');
  }
  initItems(){
    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Editar',
                  icon: 'pi pi-pencil',
                  command: () => {
                      console.log("edit")
                  }
              },
              {
                  label: 'Eliminar',
                  icon: 'pi pi-trash',
                  command: () => {
                      console.log('eliminar');
                  }
              }
          ]
      },

  ];
  }
  onList(){
    this.router.navigate(['/']);

  }
  confirmRemove() {
    const id=this.contact?.id
    if(id){
      this.confirmationService.confirm({
        message: 'La eliminacion sera de forma permanente',
        header: '¿Desea eliminar el contacto?',
        icon: 'pi pi-info-circle',
        accept: () => {
            console.log("accept",id)
        },
        reject: (type:ConfirmEventType) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                  console.log(type, 'REJECT')
                    break;
                case ConfirmEventType.CANCEL:
                  console.log(type,'CANCEL')

                    break;
            }
        },
    });
    }
}
  
}
