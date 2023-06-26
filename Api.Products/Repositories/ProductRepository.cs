using Api.Products.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Products.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly ProductDbContext _context;

    public ProductRepository(ProductDbContext context)
    {
        _context = context;
    }

    public async Task<Product> AddProductAsync(Product product, CancellationToken cancellationToken = default)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync(cancellationToken);
        return product;
    }

    public async Task<Product?> GetProductAsync(string code, CancellationToken cancellationToken = default)
    {
        return await _context.Products.SingleOrDefaultAsync(x => x.Code == code, cancellationToken);
    }

    public async Task<List<Product>> GetProductsAsync(string? categoryCode, string? search, CancellationToken cancellationToken = default)
    {
        return await _context.Products
            .Where(x => (string.IsNullOrEmpty(search) || x.Code.Contains(search) || x.Name.Contains(search)) &&
                        (string.IsNullOrEmpty(categoryCode) || x.CategoryCode == categoryCode))
            .ToListAsync(cancellationToken);
    }

    public async Task<bool> DeleteAsync(string code)
    {
        var result = await _context.Products
            .Where(x => x.Code == code)
            .ExecuteDeleteAsync();    
        //.ExecuteUpdateAsync(setters => setters.SetProperty(b => b.IsDeleted, true));
        return result > 0;
    }

    public async Task<bool> UpdateAsync(string code, string name, decimal price, string uomCode, decimal stock, string categoryCode)
    {
        var result = await _context.Products
            .Where(x => x.Code == code)
            .ExecuteUpdateAsync(setters =>
                setters
                    .SetProperty(b => b.Name, name)
                    .SetProperty(b => b.Price, price)
                    .SetProperty(b => b.UomCode, uomCode)
                    .SetProperty(b => b.CategoryCode, categoryCode)
                    .SetProperty(b => b.Stock, stock));
        return result > 0;
    }
}