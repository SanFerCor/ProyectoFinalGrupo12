using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Api.Categories.Models;


namespace Api.Categories
{
    public class CategoryDbContextFactory : IDesignTimeDbContextFactory<CategoryDbContext>
    {
        public CategoryDbContext CreateDbContext(string[] args)

        {
            var optionsBuilder = new DbContextOptionsBuilder<CategoryDbContext>();
            optionsBuilder.UseSqlServer();

            return new CategoryDbContext(optionsBuilder.Options);
            
            }
    }
}





