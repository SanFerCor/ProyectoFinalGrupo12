using Api.Products.Models;
using Api.Products.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Products.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class ProductController : ControllerBase
{
    private readonly IProductRepository _productRepository;

    public ProductController(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] Product product, CancellationToken cancellationToken = default)
    {
        var result = await _productRepository.AddProductAsync(product, cancellationToken);
        return Created(string.Empty, result);
    }

    [HttpPut("{code}")]
    public async Task<IActionResult> PutAsync(string code, [FromBody] Product product, CancellationToken cancellationToken = default)
    {
        var result = await _productRepository.UpdateAsync(code, product.Name, product.Price, product.UomCode,
            product.Stock, product.CategoryCode);
        return Ok(new { result });
    }

    [HttpGet]
    public async Task<List<Product>> PageAsync([FromQuery] string? search, [FromQuery] string? categoryCode, CancellationToken cancellationToken = default)
    {
        var result = await _productRepository.GetProductsAsync(categoryCode, search, cancellationToken);
        return result;
    }

    [HttpDelete("{code}")]
    public async Task<IActionResult> DeleteAsync(string code, CancellationToken cancellationToken = default)
    {
        await _productRepository.DeleteAsync(code);
        return NoContent();
    }

}