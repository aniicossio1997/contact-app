using api_contact.Models;
using api_contact.Models.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api_contact.Repositories
{
    public class ContactRepository : ICrud<Contact>
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public ContactRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ContactListDTO>> GetAllContacts()
        {
            var contacts = await _context.Contacts.ToListAsync();
            var contactDTOs = _mapper.Map<IEnumerable<ContactListDTO>>(contacts);
            return contactDTOs;
            
        }

        public async Task<Contact> GetById(int id)
        {
            return await _context.Contacts.FindAsync(id); 
        }

        public async Task<bool> Delete(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return false; // El contacto no se encontró, no se puede eliminar.
            }

            _context.Contacts.Remove(contact); 
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Insert(Contact contact) 
        {
            _context.Contacts.Add(contact); 
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Update(Contact contact) 
        {
            _context.Entry(contact).State = EntityState.Modified; 
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Contact>> GetAll() 
        {
            return await _context.Contacts.ToListAsync();
        }
    }
}
