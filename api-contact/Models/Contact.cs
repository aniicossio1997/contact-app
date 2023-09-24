using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace api_contact.Models
{
    public class Contact
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("first_name")]
        public string FirstName { get; set; }

       
        [Column("last_name")] 
        public string LastName { get; set; }=string.Empty;

        public string Email { get; set; }= string.Empty;

        [Required]
        [Column("phone")] // Cambiar el nombre de la columna para Phone
        public string Phone { get; set; }

        [Column("description")]
        public string Description { get; set; } = string.Empty;
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }
    }
    // Configuración de Fluent API para la precisión de las columnas datetime
    public class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.Property(n => n.CreatedAt)
                .HasColumnType("datetime(0)") // Esto establece la precisión en segundos
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .ValueGeneratedOnAdd();

            builder.Property(n => n.UpdatedAt)
                .HasColumnType("datetime(0)") // Esto establece la precisión en segundos
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .ValueGeneratedOnAddOrUpdate();

            builder.Property(contact => contact.Email)
            .HasColumnName("email"); // Cambiar el nombre de la columna para Email
        }
    }
}
