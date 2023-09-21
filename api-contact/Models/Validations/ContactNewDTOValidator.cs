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

            RuleFor(contact => contact.Email).EmailAddress().When(contact => !string.IsNullOrEmpty(contact.Email));

            RuleFor(contact => contact.Phone)
                .NotEmpty().WithMessage("El número de teléfono es obligatorio")
                .Matches(@"^\(\d{3}\)\d{3}-\d{4}$").WithMessage("El número de teléfono debe tener el formato (DDD)DDD-DDDD ejemplo: (123)456-7890");


        }
    }
}
