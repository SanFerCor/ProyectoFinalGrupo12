
using Api.Brands.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Brands.Repositories;

public class BrandRepository : IBrandRepository
{
    private readonly BrandDbContext _context;

    public BrandRepository(BrandDbContext context)
    {
        _context = context;
    }

    public async Task<Brand> AddBrandAsync(Brand brand, CancellationToken cancellationToken = default)
    {
        _context.Brands.Add(brand);
        await _context.SaveChangesAsync(cancellationToken);
        return brand;
    }

    public async Task<Brand?> GetBrandAsync(string name, CancellationToken cancellationToken = default)
    {
        return await _context.Brands.SingleOrDefaultAsync(x => x.Name == name, cancellationToken);
    }

    public async Task<List<Brand>> GetBrandAsync(string? brandCode, string? search, CancellationToken cancellationToken = default)
    {
        return await _context.Brands
            .Where(x => (string.IsNullOrEmpty(search)|| x.Name.Contains(search)))
            .ToListAsync(cancellationToken);
    }

    public async Task<bool> DeleteAsync(string name)
    {
        var result = await _context.Brands
            .Where(x => x.Name == name)
            .ExecuteDeleteAsync();
        //.ExecuteUpdateAsync(setters => setters.SetProperty(b => b.IsDeleted, true));
        return result > 0;
    }

    public async Task<bool> UpdateAsync(string name, string estado)
    {
        var result = await _context.Brands
            .Where(x => x.Name == name)
            .ExecuteUpdateAsync(setters =>
                setters
                    .SetProperty(b => b.Name, name)
                    .SetProperty(b => b.Estado, estado));
        return result > 0;
    }
}
