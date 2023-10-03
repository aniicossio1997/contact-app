import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { IContactForm, IContactFull } from 'src/app/interfaces/IContact';
import { PhoneFormatPipe } from 'src/app/shared/pipes/phone-format.pipe';

interface IProsIsNotValid {
  property: 'firstName' | 'lastName' | 'phone' | 'email';
}
interface IValidationRules {
  [key: string]: any; // Firma de índice que acepta cadenas como clave

}

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
  isResetEdit: boolean = false;
  messages2: Message[] = [];
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private phoneFormatPipe: PhoneFormatPipe
  ) {
    this.contactForm = this.initFormContact();
  }
  ngOnInit(): void {
    this.initEditForm();
    this.messages2 = [
      { severity: 'error', summary: 'Error: ', detail: 'El nombre y el teléfono son obligatorios' },
    ];
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
    if (this.isEditing) {
      this.isResetEdit = true; // Establece la marca de reset en verdadero
    }
  }
  confirm() {
    if (!this.contactForm.dirty && !this.isResetEdit) this.goToList();
    this.confirmationService.confirm({
      message: 'Los cambios no se guardaran',
      header: 'Esta seguro de salir del formulario',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.handleNavigation();
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
  isNotValideField({property}:IProsIsNotValid) {
    if(this.showMjsValid){
      return false;
    }
    return this.contactForm.get(property)?.invalid && this.contactForm?.get(property)?.touched 
  }
  isValidField( field: string ): boolean {
    const fieldAux=this.contactForm.controls[field];
    const errors_v2 = fieldAux.errors|| {};
    const isError = Object.keys(errors_v2);
    const errors = isError.length >0;
    if(errors && this.showMjsValid && !(fieldAux.value)) return true;
    return !!(errors && this.contactForm.controls[field]?.touched );
    
  }

}
