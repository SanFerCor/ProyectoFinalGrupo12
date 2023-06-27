using Api.Categories.Models;
namespace Api.Categories.Repositories;

    public interface ICategoryRepository
    {
        Task<Category> AddCategoryAsync(Category category, CancellationToken cancellationToken = default);
        Task<Category?> GetCategoryAsync(string code, CancellationToken cancellationToken = default);
        Task<List<Category>> GetCategoryAsync(string? categoryCode, string? search, CancellationToken cancellationToken = default);
        Task<bool> DeleteAsync(string code);
        Task<bool> UpdateAsync(string code, string name);
    }

