using Microsoft.EntityFrameworkCore;
using System.Configuration;
namespace api_contact.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Contact> Contacts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ContactConfiguration()); // Aplicar la configuración de Fluent API

            base.OnModelCreating(modelBuilder);
        }

    }
}
