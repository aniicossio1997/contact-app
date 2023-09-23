import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { IContactForm, IContactFull } from 'src/app/interfaces/IContact';
import { PhoneFormatPipe } from 'src/app/shared/pipes/phone-format.pipe';
import { AppState } from 'src/app/states/app.state';
import { ContactApiCrudAddActions } from 'src/app/states/contact/actions/contact.actions';
import { EnumStatusCrud } from 'src/app/states/contact/interfaces/contact-state.interfaces';
import { SELECTORS } from 'src/app/states/contact/selectors';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  @Input() isEditing: boolean = false;
  @Input() contactData: IContactFull | null = null;
  @Output() formSubmit: EventEmitter<IContactForm> = new EventEmitter<IContactForm>();
  @Input() title: string = '';
  showMjsValid: boolean = false;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private confirmationService: ConfirmationService,
    private phoneFormatPipe: PhoneFormatPipe
  ) {
    this.contactForm = this.initFormContact();
  }
  ngOnInit(): void {
    this.initEditForm();
  }
  onSubmit() {
    if (this.contactForm.invalid) {
      this.showMjsValid = true;
      return;
    }
    this.showMjsValid = false;
    const newContact: IContactForm = { ...this.contactForm.value };
    newContact.phone = newContact.phone?.replace(/\s/g, '');
    this.formSubmit.emit(newContact);
    if(this.isEditing){
      this.handleNavigation()
    }
  }
  private initFormContact() {
    return this.fb.group({
      email: ['', [Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zñÑ\s]+$/)]],
      lastName: ['', [Validators.pattern(/^[A-Za-zñÑ\s]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]],
      description: [''],
    });
  }
  private initEditForm() {
    // Para editar un contacto existente
    if (this.contactData && this.isEditing) {
      this.contactForm.setValue({
        firstName: this.contactData.firstName,
        lastName: this.contactData.lastName,
        phone: this.phoneFormatPipe.transform(this.contactData.phone),
        email: this.contactData.email,
        description: this.contactData.description,
      });
      this.contactForm.updateValueAndValidity();
    }
  }
  cleanForm() {
    this.showMjsValid = false;
    this.contactForm.reset();
  }
  confirm() {
    if (!this.contactForm.dirty) this.goToList();
    this.confirmationService.confirm({
      message: 'Los cambios no se guardaran',
      header: 'Esta seguro de salir del formulario',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.goToList();
      },
    });
  }
  public goToList() {
    this.router.navigate(['/']);
  }
  handleNavigation(): void {
    const obj: any = this.location.getState();
    if (this.location.getState() && obj['navigationId'] > 1) {
      // Hay rutas anteriores en el historial de navegación
      this.location.back();
    } else {
      // No hay rutas anteriores, redirige a la lista
      this.router.navigate(['/']); // Reemplaza con la ruta que desees
    }
  }
}
