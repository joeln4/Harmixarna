using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Booking;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IBookingService _bookingService;

        public BookingController(ApplicationDbContext context, IBookingService bookingService)
        {
            _context = context;
            _bookingService = bookingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await _context.Bookings.ToListAsync();

            var bookingDtos = bookings.Select(b => b.ToBookingDto()).ToList();

            return Ok(bookingDtos);
        }

        [HttpGet("{id:int}")] //Behövs :int?
        public async Task<IActionResult> GetById(int id)
        {
            var bookingEntity = await _context.Bookings.FindAsync(id);

            if (bookingEntity is null)
            {
                return NotFound();
            }

            return Ok(bookingEntity.ToBookingDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateBookingDto dto)
        {
            var treatments = await _context.Treatments.Where(t => dto.Treatments.Contains(t.Id)).ToListAsync();

            //Parsear det inkomna datumet från string yyyy-MM-dd till DateOnly
            if (!DateOnly.TryParseExact(dto.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var date))
            {
                throw new("Ogiltigt datumformat, ska vara yyyy-MM-dd");
            }
            //Parsear den inkomna tiden från HH-mm till TimeOnly
            if (!TimeOnly.TryParseExact(dto.Time, "HH-mm", out var time))
            {
                throw new("Ogiltigt tidsformat, ska vara HH-mm");
            }

            //Lägger ihop datum och tid till DateTime
            DateTime startTime = date.ToDateTime(time);

            //Görs till ticks (heltal) för att kunna summeras 
            var totalTicks = await _context.Treatments.Where(t => dto.Treatments.Contains(t.Id)).Select(t => t.Duration.Ticks).SumAsync();
            var totalDuration = TimeSpan.FromTicks(totalTicks);

            //Lägger på duration på startTime för att få fram endTime
            var endTime = startTime.Add(totalDuration);

            //Sätt en customer variabel och kontrollera om en email redan finns i customer. Om inte: skapa ny kund i databasen med dto värderna
            //Om den redan finns Sätt customer fälten = dto fälten för att uppdatera uppgifterna.

            var booking = new Booking
            {
                StartTime = startTime,
                EndTime = endTime,
                Message = dto.Message,
                //Customer = customer variabel
                Treatments = treatments,
            };

            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = booking.Id }, booking.ToBookingDto());
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var booking = _context.Bookings.Find(id);
            if (booking is null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPost("times")] // Ska det verkligen vara post?
        public async Task<IActionResult> GetAvailableTimes(AvailableTimesRequestDto dto)
        {

            var availableTimes = await _bookingService.GetAvailableTimes(dto);

            return Ok(availableTimes);
        }
    }
}