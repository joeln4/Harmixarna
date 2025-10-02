using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Booking;
using api.Interfaces;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<BookingService> _logger;
        public BookingService(ApplicationDbContext context, ILogger<BookingService> logger)
        {
            _context = context;
            _logger = logger;
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

            //Kollar om behandlingarnas totaltid är längre än öppettiden och om datumet är passerat
            if (totalDuration > (endOfDay - startOfDay) || dateValue < DateOnly.FromDateTime(DateTime.Now))
            {
                return [];
            }

            //Hämtar bokningar som är på valda datumet
            var bookingsThatDay = await _context.Bookings.AsNoTracking()
            .Where(b => b.StartTime < endOfDay && b.EndTime > startOfDay)
            .Select(b => new { b.StartTime, b.EndTime }).ToListAsync();

            var slotStart = startOfDay;

            //Steg som kollar om ledig plats finns var 15e minut på dagen för att det är den kortaste behandlingen
            TimeSpan slotStep = TimeSpan.FromMinutes(60);

            var availableTimes = new List<string>();
            var lastStart = endOfDay - totalDuration;

            for (slotStart = startOfDay; slotStart <= lastStart; slotStart = slotStart.Add(slotStep))
            {
                var slotEnd = slotStart.Add(totalDuration);

                bool overlaps = bookingsThatDay.Any(b => slotStart < b.EndTime && slotEnd > b.StartTime);

                if (slotStart < DateTime.Now)
                {
                    continue;
                }

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
            var ids = datesDto.Ids;

            _logger.LogInformation("Parametrar in GetAvailableDatesAsync {year}--{month} och {ids}", year, month, string.Join(",", ids));

            var availableDates = new List<string>();
            var daysInMonth = DateTime.DaysInMonth(year, month);

            for (int day = 1; day <= daysInMonth; day++)
            {
                var date = new DateOnly(year, month, day);
                _logger.LogInformation("Datum i loopen: {date}", date);
                var timesDto = new AvailableTimesRequestDto
                {
                    Date = date.ToString("yyyy-MM-dd"),
                    TreatmentIds = ids,

                };
                _logger.LogInformation("Formaterat datum: {date}", timesDto.Date);
                var times = await GetAvailableTimesAsync(timesDto);

                _logger.LogInformation("Antal tider: {Count()}", times.Count());
                if (times.Any())
                {
                    availableDates.Add(timesDto.Date);
                }
            }

            _logger.LogInformation("Antal datum: {Count}", availableDates.Count);
            return availableDates;
        }
    }
}