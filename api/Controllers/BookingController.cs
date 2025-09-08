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
    public IActionResult GetAll()
    {
      var bookings = _context.Bookings.ToList().Select(b => b.ToBookingDto());

      return Ok(bookings);
    }

    [HttpGet("{id}")]

    public IActionResult GetById(int id)
    {
      var bookingEntity = _context.Bookings.Find(id);

      if (bookingEntity is null)
      {
        return NotFound();
      }

      return Ok(bookingEntity.ToBookingDto());
    }

    [HttpPost]
    public IActionResult Create(CreateBookingDto createDto)
    {
      var treatments = _context.Treatments.Where(t => createDto.Treatments.Contains(t.Id)).ToList();
      
      if (treatments.Count() == 0)
      {
        return BadRequest("Vänligen välj minst en behandling.");
      }

      if (!DateOnly.TryParse(createDto.Date, out var date))
      {
        return BadRequest("Ogiltigt datum");
      }

      if (!TimeOnly.TryParse(createDto.StartTime, out var time))
      {
        return BadRequest("Ogiltig tid");
      }

        var booking = new Booking
        {
          // StartUtc = createDto.StartUtc,
          // EndUtc = createDto.EndUtc,
          Treatments = treatments
        };

      _context.Bookings.Add(booking);
      _context.SaveChanges();

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
  }
}