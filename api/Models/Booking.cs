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
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.Booked; // Behöver detta synas i frontend eller behövs den bara för intern logik? 
        public string? Message { get; set; }
        public int Price { get; set; }
        [ForeignKey("Customer")]
        public int CustomerId { get; set; }
        public required Customer Customer { get; set; }
        public ICollection<Treatment> Treatments { get; set; } = new List<Treatment>();
    };
};