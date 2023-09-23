import { Component, OnInit } from '@angular/core';
import { AppState } from './states/app.state';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { SELECTORS } from './states/contact/selectors';
import { EnumStatusCrud, IStatusCud } from './states/contact/interfaces/contact-state.interfaces';
import { CrudStateActions } from './states/contact/actions/contact.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit  {
  icon="/assets/fotos/contacts.png"

  constructor(private messageService: MessageService, private store:Store<AppState> ) {}
  ngOnInit(): void {
   this.store.select(SELECTORS.selectStateCrud).subscribe(dataStatus=>{
    if(dataStatus.status != EnumStatusCrud.NONE){
        this.show(dataStatus)
        this.store.dispatch(CrudStateActions.reset());
    }
   })
  }
  show(dataShow:IStatusCud) {
    
    this.messageService.add({ key: 'tc', severity: dataShow.status,  detail:`${dataShow.description}`,life: 15000  });
  }

}
