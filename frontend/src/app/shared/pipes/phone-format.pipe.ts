import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Puedes usar 'root' o proporcionar el Pipe en un módulo específico
})
@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) return '';
    const phoneNumberRegex = /^\(\d{3} \)\d{3}-\d{4}$/;
    if (phoneNumberRegex.test(value)) {
      return value;
    }
    // Eliminar todos los caracteres que no sean dígitos
    const phoneNumber = value.replace(/\D/g, '');

    // Aplicar el formato (555) 555-5555
    const formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;

    return formattedPhoneNumber;
  }

}
