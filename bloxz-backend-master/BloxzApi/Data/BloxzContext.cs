using BloxzApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BloxzApi.Data
{
    public class BloxzContext : DbContext
    {
        public BloxzContext(DbContextOptions<BloxzContext> options)
            : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }

        public DbSet<Foodshare> Foodshares { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
