using Microsoft.AspNetCore.Mvc;

namespace api_contact.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
    }
}
