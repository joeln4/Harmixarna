using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Booking
{
    public class BookingDto
    {
        public int Id { get; set; }
        public DateTime AppointmentTime { get; set; }
    }
}