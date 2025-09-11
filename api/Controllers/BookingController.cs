using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Booking;
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
        private readonly ApplicationDBContext _context;

        public BookingController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await _context.Bookings.ToListAsync();

            var bookingDtos = bookings.Select(b => b.ToBookingDto()).ToList();

            return Ok(bookingDtos);
        }

        [HttpGet("{id}")]
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
        public async Task<IActionResult> Create(CreateBookingDto createDto)
        {
            var treatments = await _context.Treatments.Where(t => createDto.Treatments.Contains(t.Id)).ToListAsync();

            if (treatments.Count == 0)
            {
                return BadRequest("Vänligen välj minst en behandling.");
            }

            if (!DateOnly.TryParseExact(createDto.Date, "yyyy-MM-dd", out var date))
            {
                return BadRequest("Ogiltigt datum");
            }

            if (!TimeOnly.TryParseExact(createDto.Time, "yyyy-MM-dd", out var time))
            {
                return BadRequest("Ogiltig tid");
            }

            var booking = new Booking
            {
                // StartUtc = createDto.StartUtc,
                // EndUtc = createDto.EndUtc,
                Treatments = treatments
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

        [HttpPost("times")]
        public IActionResult GetAvailableTimes(BookingDateDto dateDto)
        {
            if (!DateOnly.TryParseExact(dateDto.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateValue))
            {
                return BadRequest("Ogiligt datumformat, ska vara yyyy-MM-dd");
            }

            // ska hämta riktiga tider
            var times = new[] { "08:00", "09:00", "11:00" };
            return Ok(times);
        }
    }
}