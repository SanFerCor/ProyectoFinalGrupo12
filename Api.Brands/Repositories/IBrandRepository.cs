
using Api.Brands.Models;

namespace Api.Brands.Repositories
{
    public interface IBrandRepository
    {

        Task<Brand> AddBrandAsync(Brand brand, CancellationToken cancellationToken = default);
        Task<Brand?> GetBrandAsync(string code, CancellationToken cancellationToken = default);
        Task<List<Brand>> GetBrandAsync(string? categoryCode, string? search, CancellationToken cancellationToken = default);
        Task<bool> DeleteAsync(string code);
        Task<bool> UpdateAsync(string code, string name);
    }
}



