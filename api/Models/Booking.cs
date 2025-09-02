using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.Booked; // Behöver detta synas i frontend eller behövs den bara för intern logik? 
        public string? Message { get; set; }
        [ForeignKey("Customer")]
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; } //Navigation Property, Kolla upp det varför det används
        public ICollection<Treatment> Treatments { get; set; } = new List<Treatment>();


        
    }
}