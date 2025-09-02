using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Booking
{
    public class CreateBookingDto
    {
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }

        public List<int> TreatmentIds { get; set; } = new();
    }
}