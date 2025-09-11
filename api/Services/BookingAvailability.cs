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

        public async Task<IEnumerable<string>> GetAvailableTimes(BookingDateDto dateDto)
        {
            //Ska ändras så att det blir egen entitet och tabell i databasen, så att admin kan ändra
            var openingTime = new TimeOnly(9, 0);
            var closingTime = new TimeOnly(18, 0);

            //Parsear det inkomna datumet från string yyyy-MM-dd till DateOnly
            if (!DateOnly.TryParseExact(dateDto.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateValue))
            {
                throw new("Ogiltigt datumformat, ska vara yyyy-MM-dd");
            }

            //Kontrollerar om listan med Id är tom
            if (dateDto.TreatmentIds == null || dateDto.TreatmentIds.Count == 0)
            {
                return [];
            }

            //Sätter intervall för dagen för att kunna hämta bokningar satta samma dag
            var startOfDay = dateValue.ToDateTime(openingTime);
            var endOfDay = dateValue.ToDateTime(closingTime);

            //Görs till ticks (heltal) för att kunna summeras i databasen
            var totalTicks = await _context.Treatments.Where(t => dateDto.TreatmentIds.Contains(t.Id))
            .SumAsync(t => t.Duration.Ticks);

            var totalDuration = TimeSpan.FromTicks(totalTicks);


            //Kollar om behandlingarnas totaltid är längre än öppettiden
            if (totalDuration > (endOfDay - startOfDay))
            {
                return [];
            }
    

            //Hämtar bokningar som är på valda datumet
            var bookingsThatDay = await _context.Bookings.AsNoTracking()
            .Where(b => b.StartTime < endOfDay && b.EndTime > startOfDay)
            .Select(b => new { b.StartTime, b.EndTime }).ToListAsync();

            var slotStart = startOfDay;
            // var slotEnd = slotStart.Add(totalDuration);

            //Steg som kollar om ledig plats finns var 15e minut på dagen för att det är den kortaste behandlingen
            TimeSpan slotStep = TimeSpan.FromMinutes(15);
            
            var availableTimes = new List<string>();
            var lastStart = endOfDay - totalDuration;

            for (slotStart = startOfDay; slotStart <= lastStart; slotStart = slotStart.Add(slotStep))
            {
                var slotEnd = slotStart.Add(totalDuration);

                bool overlaps = bookingsThatDay.Any(b => slotStart < b.EndTime && slotEnd > b.StartTime);

                if (!overlaps)
                {
                    availableTimes.Add(slotStart.ToString("HH:mm"));
                }

            }

            return availableTimes;
        }
    }
}