using api_contact.Models;
using api_contact.Models.DTO;

namespace api_contact.Services
{
    public interface IContactService
    {
        Task<IEnumerable<ContactListDTO>> GetAllContacts();

        Task<Contact> GetContactById(int id);
        Task<ContactListDTO> AddContactAsync(ContactNewDTO contactNewDTO);
        Task<bool> DeleteContactAsync(int id);
        Task<bool> UpdateContactAsync(int id, ContactNewDTO contactUpdateDTO);
    }
}
