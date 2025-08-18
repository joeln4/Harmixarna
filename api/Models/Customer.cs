using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public required string Name { get; set; } 
        public required string Email { get; set; }
        public string? Phone { get; set; }
        public required string Password { get; set; } // Skapas med identity?
        public bool IsAdmin { get; set; }
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}