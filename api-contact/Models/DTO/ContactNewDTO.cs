using System.ComponentModel.DataAnnotations.Schema;

namespace api_contact.Models.DTO
{
    public class ContactNewDTO
    {
       
      
        public string FirstName { get; set; }

         public string LastName { get; set; }

         public string Email { get; set; }

        public string Phone { get; set; }

        public string Description { get; set; } = string.Empty;

    }
}
