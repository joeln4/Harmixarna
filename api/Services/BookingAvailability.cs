using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Booking;

namespace api.Services
{
    public class BookingAvailability
    {
        private readonly ApplicationDbContext _context;
        public BookingAvailability(ApplicationDbContext context)
        {
            _context = context;
        }

        public string[] GetAvailableTimes(BookingDateDto dateDto)
        {
            var bookingTimes = new[] { "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00" };

            if (!DateOnly.TryParseExact(dateDto.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateValue))
            {
                throw new("Ogiligt datumformat, ska vara yyyy-MM-dd");
            }


            
            return bookingTimes;
        }
    }
}