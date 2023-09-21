import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IContact } from 'src/app/interfaces/IContact';
import { AppState } from 'src/app/states/app.state';
import { ContactApiActions } from 'src/app/states/contact/actions/contact.actions';
import { SELECTORS } from 'src/app/states/contact/selectors';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'pages-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],

})
export class ContactListComponent implements OnInit {
  public contacts:IContact[]=[]
  position: string = 'top';

  constructor(private store:Store<AppState>,private router: Router, private confirmationService: ConfirmationService){
  }
  ngOnInit(): void {
         this.store.dispatch(ContactApiActions.loadContactList());
         this.store.select(SELECTORS.selectContactList).subscribe(data=>{
          this.contacts=data
         })
      }
  onDetail(contactId:number){
    this.router.navigate(['/contacts', contactId]);

  }
  confirmRemove(id:number) {

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
  onGoPageNew(){
    this.router.navigate(['/contacts/new']);

  }
}
