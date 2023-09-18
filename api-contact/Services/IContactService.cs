using api_contact.Models;

namespace api_contact.Services
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetAllContacts();
    }
}
