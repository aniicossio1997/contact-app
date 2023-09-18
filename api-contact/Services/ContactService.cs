namespace api_contact.Services
{
    public class ContactService:IContactService
    {
        private readonly ICrud<Contact> _contactRepository;

        public ContactService(ICrud<Contact> contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public async Task<IEnumerable<Contact>> GetAllContacts()
        {
            return await _contactRepository.GetAll();
        }
    }
}
