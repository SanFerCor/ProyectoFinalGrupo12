using Api.Products.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Products
{
    public class ProductDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; } = default!;

        public ProductDbContext()
        {

        }

        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>(product =>
            {
                product.HasKey(x => x.Code);

                product.Property(x => x.Name).HasMaxLength(250);
                product.Property(x => x.Price).HasPrecision(12, 2);
                product.Property(x => x.Code).HasMaxLength(10);
                product.Property(x => x.Stock).HasPrecision(12, 2);
                product.Property(x => x.UomCode).HasMaxLength(3);
            });
        }
    }
}
