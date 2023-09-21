import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IContactForm } from 'src/app/interfaces/IContact';
import { AppState } from 'src/app/states/app.state';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ContactApiCrudActions } from 'src/app/states/contact/actions/contact.actions';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  formContact: FormGroup;
  constructor(private contactServices:ContactService,private fb: FormBuilder,private store:Store<AppState>,private router: Router, private confirmationService: ConfirmationService) {
    this.formContact=this.initFormContact();
  }
  ngOnInit(): void {
    this.formContact.valueChanges.subscribe(data=>{
    })
  }

  private initFormContact() {
    return this.fb.group({
      email: ['', [Validators.email]], 
      firstName: ['',[Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)], ],
      lastName: ['',[Validators.pattern(/^[A-Za-z\s]+$/)],],
      phone: ['',[Validators.required, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]],
      description: [''],
    });
  }
  public goToList() {
    this.router.navigate(['/']);
  }
  onSubmit(){
    if(this.formContact.invalid){
      return;
    }
    const newContact:IContactForm = { ...this.formContact.value };
    newContact.phone=newContact.phone?.replace(/\s/g, '');

    this.store.dispatch(ContactApiCrudActions.loadAdd({bodyContact:newContact}));
    // this.contactServices.addContact(newContact).subscribe(data=>{
    //   console.log(data)
    // })
  }
  confirm() {
    if(!this.formContact.dirty) this.goToList();
    this.confirmationService.confirm({
        message: 'Los cambios no se guardaran',
        header: 'Esta seguro de salir del formulario',
        icon: 'pi pi-info-circle',
        accept: () => {
           this.goToList()
        }
    });
  }
  cleanForm(){
    this.formContact.reset();
  }
}
