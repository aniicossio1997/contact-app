using api_contact.Models.DTO;
using AutoMapper;

namespace api_contact.Services
{
    public class ContactService:IContactService
    {
        private readonly ICrud<Contact> _contactRepository;
        private readonly IMapper _mapper;
        public ContactService(ICrud<Contact> contactRepository, IMapper mapper)
        {
            _mapper = mapper;
            _contactRepository = contactRepository;
        }

        public async Task<ContactListDTO> AddContactAsync(ContactNewDTO contactNewDTO)
        {
            var contact = _mapper.Map<Contact>(contactNewDTO);
            
            if (await _contactRepository.Insert(contact))
            {
                return _mapper.Map<ContactListDTO>(contact);
            }
            return null; // Puedes manejar esto según tus necesidades.
        }

        public async Task<bool> DeleteContactAsync(int id)
        {
            return await _contactRepository.Delete(id);
        }

        public async Task<IEnumerable<ContactListDTO>> GetAllContacts()
        {
            var contacts = await _contactRepository.GetAll();
            var contactDTOs = _mapper.Map<IEnumerable<ContactListDTO>>(contacts);
            return contactDTOs;
        }

        public async Task<Contact> GetContactById(int id)
        {
            var contact= await _contactRepository.GetById(id);
            return contact;
        }

        public async Task<bool> UpdateContactAsync(int id, ContactNewDTO contactUpdateDTO)
        {
            var existingContact = await _contactRepository.GetById(id);
            if (existingContact == null)
            {
                return false; // El contacto no existe.
            }

            _mapper.Map(contactUpdateDTO, existingContact);

            return await _contactRepository.Update(existingContact);
        }
    }
}
