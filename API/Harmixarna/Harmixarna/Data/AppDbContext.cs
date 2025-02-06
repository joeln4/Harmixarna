using Harmixarna.Models;
using Microsoft.EntityFrameworkCore;

namespace Harmixarna.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Appointment> Appointments { get; set; }
    }
}
