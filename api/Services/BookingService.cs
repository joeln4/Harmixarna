using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Booking;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;
        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<string>> GetAvailableTimesAsync(AvailableTimesRequestDto dto)
        {
            //Ska ändras så att det blir egen entitet och tabell i databasen, så att admin kan ändra
            var openingTime = new TimeOnly(9, 0);
            var closingTime = new TimeOnly(18, 0);

            //Parsear det inkomna datumet från string yyyy-MM-dd till DateOnly
            if (!DateOnly.TryParseExact(dto.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateValue))
            {
                throw new("Ogiltigt datumformat, ska vara yyyy-MM-dd");
            }

            //Kontrollerar om listan med Id är tom
            if (dto.TreatmentIds == null || dto.TreatmentIds.Count == 0)
            {
                return [];
            }

            //Sätter intervall för dagen för att kunna hämta bokningar satta samma dag
            var startOfDay = dateValue.ToDateTime(openingTime);
            var endOfDay = dateValue.ToDateTime(closingTime);

            var durations = await _context.Treatments.Where(t => dto.TreatmentIds.Contains(t.Id)).Select(t => t.Duration).ToListAsync();

            //görs till ticks (heltal) för att kunna summeras
            var totalTicks = durations.Sum(d => d.Ticks);
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

        public async Task<List<string>> GetAvailableDatesAsync(AvailableDatesRequestDto datesDto)
        {
            //Se till så att year och month kommer i rätt format från frontend
            var year = datesDto.Year;
            var month = datesDto.Month;
            var ids = datesDto.TreatmentIds;

            var availableDates = new List<string>();
            var daysInMonth = DateTime.DaysInMonth(year, month);

            for (int day = 1; day <= daysInMonth; day++)
            {
                var date = new DateOnly(year, month, day);

                var timesDto = new AvailableTimesRequestDto
                {
                    Date = date.ToString("yyyy-MM-dd"),
                    TreatmentIds = ids
                };
                var times = await GetAvailableTimesAsync(timesDto);

                if (times.Any())
                {
                    availableDates.Add(timesDto.Date);
                }
            } 
            return availableDates;
        }
    }
}