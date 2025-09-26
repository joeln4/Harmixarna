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
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

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
            var bookings = await _context.Bookings.AsNoTracking().Include(b => b.Treatments).Include(b => b.Customer).ToListAsync();

            var bookingDtos = bookings.Select(b => b.ToBookingDto()).ToList();

            return Ok(bookingDtos);
        }

        [HttpGet("{id:int}")] //Behövs :int?
        public async Task<IActionResult> GetById(int id)
        {
            var bookingEntity = await _context.Bookings.AsNoTracking().Include(b => b.Treatments).Include(b => b.Customer).FirstOrDefaultAsync(b => b.Id == id);

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
                return BadRequest("Ogiltigt datumformat, ska vara yyyy-MM-dd");
            }
            //Parsear den inkomna tiden från HH:mm till TimeOnly
            if (!TimeOnly.TryParseExact(dto.Time, "HH:mm", out var time))
            {
                return BadRequest("Ogiltigt tidsformat, ska vara HH:mm");
            }

            //Lägger ihop datum och tid till DateTime
            DateTime startTime = date.ToDateTime(time);

            //Görs till ticks (heltal) för att kunna summeras
            var totalTicks = treatments.Sum(t => t.Duration.Ticks);
            var totalDuration = TimeSpan.FromTicks(totalTicks);

            //Lägger på duration på startTime för att få fram endTime
            var endTime = startTime.Add(totalDuration);

            //Tar bort alla blanksteg innan och efter. Vet ej om det behövs med tanke på zod validering
            var name = dto.Customer.Name.Trim();
            var email = dto.Customer.Email.Trim().ToLowerInvariant();
            var phone = string.IsNullOrWhiteSpace(dto.Customer.Phone) ? null : dto.Customer.Phone.Trim();
            var message = string.IsNullOrWhiteSpace(dto.Message) ? null : dto.Message.Trim();

            //Hämtar kund baserat på om email redan finns
            Customer? customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);

            //Skapar ny kund om emailen inte finns annars byts namn och telefonnumer ut
            if (customer is null)
            {
                customer = new Customer
                {
                    Name = name,
                    Email = email,
                    Phone = phone
                };
                await _context.AddAsync(customer);
            }
            else
            {
                customer.Name = name;
                customer.Phone = phone;
            }

            var booking = new Booking
            {
                StartTime = startTime,
                EndTime = endTime,
                Message = message,
                Customer = customer,
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

        [HttpPost("times")] // Ska det verkligen vara post?
        public async Task<IActionResult> GetAvailableTimes(AvailableTimesRequestDto dto)
        {
            var availableTimes = await _bookingService.GetAvailableTimesAsync(dto);

            return Ok(availableTimes);
        }

        [HttpGet("dates")]

        public async Task<IActionResult> GetAvailableDates([FromQuery] AvailableDatesRequestDto dto)
        {
            var availableDates = await _bookingService.GetAvailableDatesAsync(dto);

            return Ok(availableDates);
        }
    }
}