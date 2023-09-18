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

        public async Task<IEnumerable<ContactListDTO>> GetAllContacts()
        {
            var contacts = await _contactRepository.GetAll();
            var contactDTOs = _mapper.Map<IEnumerable<ContactListDTO>>(contacts);
            return contactDTOs;
        }
    }
}
