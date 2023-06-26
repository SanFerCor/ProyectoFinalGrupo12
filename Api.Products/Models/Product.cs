namespace Api.Products.Models;

public class Product
{
    public string Code { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string UomCode { get; set; } = default!;

    public decimal Stock { get; set; }

    public decimal Price { get; set; }

    public string? ImagePath { get; set; }

    public string CategoryCode { get; set; } = default!;
    public bool IsDeleted { get; set; }
}