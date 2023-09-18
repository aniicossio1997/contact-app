using api_contact.Models.Validations;
using Microsoft.AspNetCore.Mvc;
using FluentValidation.AspNetCore;
using api_contact.Models.DTO;

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
                return Ok(contacts);
            }catch (Exception ex)
            {
                return StatusCode(500, $"Error interno{ ex.Message}");
            }
        }
        
        [HttpPost]
        public IActionResult CreateContact([FromBody] ContactNewDTO contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Si la validación pasa, realiza la lógica de creación del contacto

            return Ok("Contacto creado exitosamente");
        }
    }
}
