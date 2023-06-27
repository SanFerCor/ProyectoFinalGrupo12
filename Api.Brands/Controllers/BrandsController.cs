

using Api.Brands.Models;
using Api.Brands.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Brands.Controllers;

[ApiController]
[Route("api/brands")]


    public class BrandController : ControllerBase
    {
    private readonly IBrandRepository _brandRepository;

    public BrandController(IBrandRepository catalogRepository)
    {
        _brandRepository = catalogRepository;
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] Brand brand, CancellationToken cancellationToken = default)
    {
        var result = await _brandRepository.AddBrandAsync(brand, cancellationToken);
        return Created(string.Empty, result);
    }

    [HttpPut("{code}")]
    public async Task<IActionResult> PutAsync(string code, [FromBody] Brand brand, CancellationToken cancellationToken = default)
    {
        var result = await _brandRepository.UpdateAsync(brand.Name, brand.Estado);
        return Ok(new { result });
    }

    [HttpGet]
    public async Task<List<Brand>> PageAsync([FromQuery] string? search, [FromQuery] string? name, CancellationToken cancellationToken = default)
    {
        var result = await _brandRepository.GetBrandAsync(name, search, cancellationToken);
        return result;
    }

    [HttpDelete("{code}")]
    public async Task<IActionResult> DeleteAsync(string code, CancellationToken cancellationToken = default)
    {
        await _brandRepository.DeleteAsync(code);
        return NoContent();
    }

}

