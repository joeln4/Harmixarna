using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Booking
{
    public class CreateBookingDto //Skall ändras eller skapa en ny så att den tar in användarens val i frontend och backend sökter konverteringen till fälten.
    {
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }

        public List<int> TreatmentIds { get; set; } = new();
    }
}