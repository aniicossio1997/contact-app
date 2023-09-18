using api_contact.Models.DTO;
using FluentValidation;

namespace api_contact.Models.Validations
{
    public class ContactNewDTOValidator : AbstractValidator<ContactNewDTO>
    {
        public ContactNewDTOValidator()
        {
            RuleFor(contact => contact.FirstName)
                .NotEmpty().WithMessage("El nombre es obligatorio")
                .MaximumLength(50).WithMessage("El nombre no puede tener más de 50 caracteres");

            RuleFor(contact => contact.Phone)
                .NotEmpty().WithMessage("El número de teléfono es obligatorio")
                .GreaterThan(0).WithMessage("El número de teléfono debe ser un número positivo")
                .Must(phone => phone.ToString().Length >= 5)
                .WithMessage("El número de teléfono debe tener al menos 5 dígitos");

            RuleFor(contact => contact.Email).EmailAddress().When(contact => !string.IsNullOrEmpty(contact.Email));

            // Puedes agregar más reglas de validación según tus necesidades
        }
    }
}
