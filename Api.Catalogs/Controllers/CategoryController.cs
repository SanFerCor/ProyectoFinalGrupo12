using Api.Categories.Models;
using Microsoft.AspNetCore.Mvc;
using Api.Categories.Repositories;

namespace Api.Categories.Controllers;


[ApiController]
[Route("api/categories")]

    public class CategoryController : ControllerBase
    {

    private readonly ICategoryRepository _categoryRepository;

    public CategoryController(ICategoryRepository catalogRepository)
    {
        _categoryRepository = catalogRepository;
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] Category category, CancellationToken cancellationToken = default)
    {
        var result = await _categoryRepository.AddCategoryAsync(category, cancellationToken);
        return Created(string.Empty, result);
    }

    [HttpPut("{code}")]
    public async Task<IActionResult> PutAsync(string code, [FromBody] Category catalog, CancellationToken cancellationToken = default)
    {
        var result = await _categoryRepository.UpdateAsync(code, catalog.Name);
        return Ok(new { result });
    }

    [HttpGet]
    public async Task<List<Category>> PageAsync([FromQuery] string? search, [FromQuery] string? categoryCode, CancellationToken cancellationToken = default)
    {
        var result = await _categoryRepository.GetCategoryAsync(categoryCode, search, cancellationToken);
        return result;
    }

    [HttpDelete("{code}")]
    public async Task<IActionResult> DeleteAsync(string code, CancellationToken cancellationToken = default)
    {
        await _categoryRepository.DeleteAsync(code);
        return NoContent();
    }

}

    






