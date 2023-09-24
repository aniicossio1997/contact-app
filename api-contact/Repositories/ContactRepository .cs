using api_contact.Models;
using api_contact.Models.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api_contact.Repositories
{
    public class ContactRepository : ICrud<Contact>
    {
        private readonly ApplicationDbContext _context;
       
        public ContactRepository(ApplicationDbContext context)
        {
            _context = context;
           
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
            var contacts = await _context.Contacts
                            .OrderByDescending(c => c.CreatedAt)
                            .ToListAsync();
            return contacts;
        }

        public async Task<IEnumerable<Contact>> Search(string searchTerm)
        {
            searchTerm = searchTerm.Trim(); // Eliminar espacios en blanco al principio y al final

            var contacts = await _context.Contacts.ToListAsync(); // Obtener todos los contactos

            var filteredContacts = contacts
                .Where(contact =>
                    contact.Email.Contains(searchTerm.ToLower(), StringComparison.OrdinalIgnoreCase) ||
                    contact.FirstName.Contains(searchTerm.ToLower(), StringComparison.OrdinalIgnoreCase) ||
                    contact.LastName.Contains(searchTerm.ToLower(), StringComparison.OrdinalIgnoreCase)
                );

            return filteredContacts;
        }

    }
}
