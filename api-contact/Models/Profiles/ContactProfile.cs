using api_contact.Models.DTO;
using AutoMapper;

namespace api_contact.Models.Profiles
{
    public class ContactProfile:Profile
    {
        public ContactProfile() {
            CreateMap<Contact, ContactListDTO>().ReverseMap();
            CreateMap<Contact, ContactNewDTO>().ReverseMap();
        }
    }
}
