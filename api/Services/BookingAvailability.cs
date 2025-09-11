using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Booking;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class BookingAvailability
    {
        private readonly ApplicationDbContext _context;
        public BookingAvailability(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string[]> GetAvailableTimes(BookingDateDto dateDto)
        {
            var bookingTimes = new[] { "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00" };

            //Ska ändras så att det blir egen entitet och tabell i databasen, så att admin kan ändra
            var openingTime = new TimeOnly(9, 0);
            var closingTime = new TimeOnly(18, 0);

            
            //Parsear det inkomna datumet från string yyyy-MM-dd till DateOnly
            if (!DateOnly.TryParseExact(dateDto.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateValue))
            {
                throw new("Ogiligt datumformat, ska vara yyyy-MM-dd");
            }

            //Sätter intervall för dagen för att kunna hämta bokningar satta samma dag
            var startOfDay = dateValue.ToDateTime(openingTime);
            var endOfDay = dateValue.ToDateTime(closingTime);

            var bookingsThatDay = await _context.Bookings.AsNoTracking()
            .Where(b => b.StartTime >= startOfDay && b.StartTime < endOfDay)
            .Select(b => new { b.StartTime, b.EndTime }).ToListAsync();

            //Görs till ticks (heltal) för att kunna summeras i databasen
            var totalTicks = await _context.Treatments.Where(t => dateDto.TreatmentIds.Contains(t.Id))
            .SumAsync(t => t.Duration.Ticks);

            var totalDuration = TimeSpan.FromTicks(totalTicks);

            var slotStart = startOfDay;
            var slotEnd = slotStart + totalDuration;

            //Steg som kollar om ledig plats finns var 15e minut på dagen för att det är den kortaste behandlingen
            TimeSpan slotStep = TimeSpan.FromMinutes(15);


            var availableTimes = new List<string>();

            foreach (var b in bookingsThatDay)
            {
                if (slotStart >= b.EndTime && slotEnd <= b.StartTime)
                {
                    // availableTimes.Add(slotStart);
                }
                
            }

    
            return bookingTimes;
        }
    }
}