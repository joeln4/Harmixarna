using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Booking
{
    public class BookingDateDto
    {
        public string Date { get; set; } = default!;
        public List<int> TreatmentIds { get; set; } = new();
    }
}