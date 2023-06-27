using Api.Products.Models;

namespace Api.Products.Repositories;

public interface IProductRepository
{
    Task<Product> AddProductAsync(Product product, CancellationToken cancellationToken = default);
    Task<Product?> GetProductAsync(string code, CancellationToken cancellationToken = default);
    Task<List<Product>> GetProductsAsync(string? categoryCode, string? search, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(string code);
    Task<bool> UpdateAsync(string code, string name, decimal price, string uomCode, decimal stock, string categoryCode,
        string imagePath);
}