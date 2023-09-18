using api_contact.Models;
using api_contact.Models.DTO;

namespace api_contact.Services
{
    public interface IContactService
    {
        Task<IEnumerable<ContactListDTO>> GetAllContacts();
    }
}
