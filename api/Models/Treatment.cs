using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class Treatment
    {
        public int Id { get; set; }
        public required string Type { get; set; }
        [Precision(18, 2)]
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public TimeSpan Duration { get; set; } // Antal mintuer. Lägg till min efter när det visas, eller gör till string och ha med det direkt.
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}