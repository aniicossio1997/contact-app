namespace api_contact.Models
{
    public interface ICrud<TEntity>
    {
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> GetById(int id);
        Task<bool> Delete(int id);
        Task<bool> Insert(TEntity entity);
        Task<bool> Update(TEntity entity);
        // Nuevo método para búsqueda
        Task<IEnumerable<TEntity>> Search(string searchTerm);
    }
}
