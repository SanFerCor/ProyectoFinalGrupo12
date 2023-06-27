using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Api.Brands.Models;


namespace Api.Brands
{
    public class BrandDbContextFactory : IDesignTimeDbContextFactory<BrandDbContext>
    {

        public BrandDbContext CreateDbContext(string[] args)
            {
            var optionsBuilder = new DbContextOptionsBuilder<BrandDbContext>();
            optionsBuilder.UseSqlServer();

            return new BrandDbContext(optionsBuilder.Options);

        }
    }
}
