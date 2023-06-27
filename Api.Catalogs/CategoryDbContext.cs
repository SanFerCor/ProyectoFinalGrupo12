
using Api.Categories.Models;
using Microsoft.EntityFrameworkCore;


namespace Api.Categories
{
    public class CategoryDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; } = default!;

        public CategoryDbContext()
        {

        }

        public CategoryDbContext(DbContextOptions<CategoryDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>(category =>
            {
                category.HasKey(x => x.Code);

               category.Property(x => x.Name).HasMaxLength(250);
            });


        }
}
}