using Api.Categories.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Categories.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly CategoryDbContext _context;

    public CategoryRepository(CategoryDbContext context)
    {
        _context = context;
    }

    public async Task<Category> AddCategoryAsync(Category catalog, CancellationToken cancellationToken = default)
    {
        _context.Categories.Add(catalog);
        await _context.SaveChangesAsync(cancellationToken);
        return catalog;
    }

    public async Task<Category?> GetCategoryAsync(string code, CancellationToken cancellationToken = default)
    {
        return await _context.Categories.SingleOrDefaultAsync(x => x.Code == code, cancellationToken);
    }

    public async Task<List<Category>> GetCategoryAsync(string? categoryCode, string? search, CancellationToken cancellationToken = default)
    {
        return await _context.Categories
            .Where(x => (string.IsNullOrEmpty(search) || x.Code.Contains(search) || x.Name.Contains(search)) )
            .ToListAsync(cancellationToken);
    }

    public async Task<bool> DeleteAsync(string code)
    {
        var result = await _context.Categories
            .Where(x => x.Code == code)
            .ExecuteDeleteAsync();
        //.ExecuteUpdateAsync(setters => setters.SetProperty(b => b.IsDeleted, true));
        return result > 0;
    }

    public async Task<bool> UpdateAsync(string code, string name)
    {
        var result = await _context.Categories
            .Where(x => x.Code == code)
            .ExecuteUpdateAsync(setters =>
                setters
                    .SetProperty(b => b.Name, name));
        return result > 0;
    }
}
