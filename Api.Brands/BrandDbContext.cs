using Api.Brands.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Brands
{
    public class BrandDbContext : DbContext
 
        {
            public DbSet<Brand> Brands { get; set; } = default!;

            public BrandDbContext()
            {

            }

            public BrandDbContext(DbContextOptions<BrandDbContext> options) : base(options)
            {
            }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

                modelBuilder.Entity<Brand>(brand =>
                {

                    brand.Property(x => x.Name).HasMaxLength(250);
                    brand.Property(x => x.Estado).HasMaxLength(250);
                });


            }
        }
    }

