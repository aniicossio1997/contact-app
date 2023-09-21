using api_contact.Models.Validations;
using Microsoft.AspNetCore.Mvc;
using FluentValidation.AspNetCore;
using api_contact.Models.DTO;
using Microsoft.EntityFrameworkCore;
using api_contact.Common;

namespace api_contact.Controllers
{
    [ApiController]
    [Route("api/contacts")]
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;
        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            try { 
                 var contacts=await _contactService.GetAllContacts();
                return Ok(new ApiResponse<IEnumerable<ContactListDTO>>("Lista de contactos", contacts));
            }catch (Exception ex)
            {
                return StatusCode(500, $"Error interno{ ex.Message}");
            }
        }
        
 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContactById(int id)
        {
            try {
                var contact = await _contactService.GetContactById(id);

                if (contact == null)
                {
                    return NotFound(new ApiResponse<object>("No se encontro el contacto", null,false)); // El contacto no se encontró, devuelve un 404 Not Found.
                }

                return Ok(new ApiResponse<Contact>("Contact full", contact));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");

            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] ContactNewDTO contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdContact = await _contactService.AddContactAsync(contact);

            if (createdContact != null)
            {
                return Ok(new ApiResponse<ContactListDTO>("Contacto creado exitosamente", createdContact));
            }
            else
            {
                return StatusCode(500, "No se pudo crear el contacto");
            }
        }
    }
}
